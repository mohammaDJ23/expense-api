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

import { LocalAccountVerificationStorageService } from './localAccountVerificationStorage.service';
import { LocalAccountVerificationTokenService } from './localAccountVerificationToken.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { ILocalAccountVerificationMessagePayload } from '@/modules/authentication/domain/types/localAccountVerificationMessagePayload.type';
import type { ISelectEmailIdentity } from '@/modules/authentication/infrastructure/schemas/emailIdentity.schema';
import type { ISelectLocalAccount } from '@/modules/authentication/infrastructure/schemas/localAccount.schema';
import type { LocalAccountVerificationRequestDto } from '@/modules/authentication/interface/dtos/localAccountVerification.request.dto';

@Injectable()
export class LocalAccountVerificationService implements IService<
    LocalAccountVerificationRequestDto,
    boolean
> {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
        private readonly localAccountVerificationTokenService: LocalAccountVerificationTokenService,
        private readonly localAccountVerificationStorageService: LocalAccountVerificationStorageService,
        private readonly outboxEventPublisherService: OutboxEventPublisherService,
    ) {}

    @Transactional()
    async execute(input: LocalAccountVerificationRequestDto): Promise<boolean> {
        const payload = this.localAccountVerificationTokenService.verify(input.token);

        {
            let storedToken: string | null = null;
            try {
                storedToken = await this.localAccountVerificationStorageService.get(payload.email);
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
            const payload: ILocalAccountVerificationMessagePayload = {
                email: emailIdentity.email,
            };

            await this.outboxEventPublisherService.publish({
                aggregateId: uuid(),
                aggregateType: AuthenticationResource.LOCAL_ACCOUNT_VERIFICATION,
                eventType: 'created',
                payload,
                createdAt: creationTime,
            });
        }

        return true;
    }
}
