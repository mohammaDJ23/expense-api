import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Transactional } from '@nestjs-cls/transactional';
import { v4 as uuid } from 'uuid';

import { getCurrentUTCTimestamp } from '@/core/utils/getCurrentUTCTimestamp.util';
import { UpdateLocalAccountCommand } from '@/modules/authentication/applications/commands/updateLocalAccount/updateLocalAccount.command';
import { FindEmailIdentityByEmailOrNullQuery } from '@/modules/authentication/applications/queries/findEmailIdentityByEmailOrNull/findEmailIdentityByEmailOrNull.query';
import { FindLocalAccountByEmailIdOrNullQuery } from '@/modules/authentication/applications/queries/findLocalAccountByEmailIdOrNull/findLocalAccountByEmailIdOrNull.query';
import { AuthenticationResource } from '@/modules/authentication/authentication.enum';
import { OutboxEventPublisherService } from '@/modules/outbox/applications/services/outboxEventPublisher.service';

import { VerificationStorageService } from './verificationStorage.service';
import { VerificationTokenService } from './verificationToken.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { ILocalVerifyVerificationMessagePayload } from '@/modules/authentication/domain/types/localVerifyVerificationMessagePayload.type';
import type { ISelectEmailIdentity } from '@/modules/authentication/infrastructure/schemas/emailIdentity.schema';
import type { ISelectLocalAccount } from '@/modules/authentication/infrastructure/schemas/localAccount.schema';
import type { LocalVerifyVerificationRequestDto } from '@/modules/authentication/interface/dtos/localVerifyVerification.request.dto';

@Injectable()
export class LocalVerifyVerificationService implements IService<
    LocalVerifyVerificationRequestDto,
    boolean
> {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
        private readonly verificationTokenService: VerificationTokenService,
        private readonly verificationStorageService: VerificationStorageService,
        private readonly outboxEventPublisherService: OutboxEventPublisherService,
    ) {}

    @Transactional()
    async execute(input: LocalVerifyVerificationRequestDto): Promise<boolean> {
        const payload = this.verificationTokenService.verify(input.token);

        {
            let storedToken: string | null = null;
            try {
                storedToken = await this.verificationStorageService.get(payload.email);
            } catch {}

            if (storedToken !== input.token) {
                throw new BadRequestException();
            }
        }

        const emailIdentity = await this.queryBus.execute<
            FindEmailIdentityByEmailOrNullQuery,
            ISelectEmailIdentity
        >(
            new FindEmailIdentityByEmailOrNullQuery({
                email: payload.email,
            }),
        );

        if (!emailIdentity) {
            throw new BadRequestException();
        }

        const localAccount = await this.queryBus.execute<
            FindLocalAccountByEmailIdOrNullQuery,
            ISelectLocalAccount
        >(
            new FindLocalAccountByEmailIdOrNullQuery({
                emailId: emailIdentity.id,
            }),
        );

        if (!localAccount) {
            throw new BadRequestException();
        }

        if (localAccount.verifiedAt) {
            throw new ForbiddenException();
        }

        const creationTime = getCurrentUTCTimestamp();

        try {
            await this.commandBus.execute<UpdateLocalAccountCommand, ISelectLocalAccount>(
                new UpdateLocalAccountCommand({
                    id: localAccount.id,
                    verifiedAt: creationTime,
                    updatedAt: creationTime,
                }),
            );
        } catch {
            throw new InternalServerErrorException('Could not verify your email, try again');
        }

        {
            const payload: ILocalVerifyVerificationMessagePayload = {
                email: emailIdentity.email,
            };

            await this.outboxEventPublisherService.publish({
                aggregateId: uuid(),
                aggregateType: AuthenticationResource.LOCAL_VERIFY_VERIFICATION,
                eventType: 'created',
                payload,
                createdAt: creationTime,
            });
        }

        return true;
    }
}
