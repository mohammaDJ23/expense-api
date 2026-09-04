import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Transactional } from '@nestjs-cls/transactional';
import { v4 as uuid } from 'uuid';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { getCurrentUTCTimestamp } from '@/core/utils/getCurrentUTCTimestamp.util';
import { CreateEmailIdentityCommand } from '@/modules/authentication/applications/commands/createEmailIdentity/createEmailIdentity.command';
import { CreateLocalAccountCommand } from '@/modules/authentication/applications/commands/createLocalAccount/createLocalAccount.command';
import { UniqueEmailIdentityValidatorService } from '@/modules/authentication/applications/services/validators/uniqueEmailIdentityValidator.service';
import { AuthenticationResource } from '@/modules/authentication/authentication.enum';
import { OutboxEventPublisherService } from '@/modules/outbox/applications/services/outboxEventPublisher.service';
import { CreateUserService } from '@/modules/user/applications/services/createUser.service';
import { UserRoles } from '@/modules/user/domain/enums/userRoles.enum';

import { LocalSignupStorageService } from './localSignupStorage.service';
import { LocalSignupTokenService } from './localSignupToken.service';
import { PasswordHasherService } from './passwordHasher.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { ILocalSignupMessagePayload } from '@/modules/authentication/domain/types/localSignupMessagePayload.type';
import type { ISelectEmailIdentity } from '@/modules/authentication/infrastructure/schemas/emailIdentity.schema';
import type { ISelectLocalAccount } from '@/modules/authentication/infrastructure/schemas/localAccount.schema';
import type { LocalSignupRequestDto } from '@/modules/authentication/interface/dtos/localSignup.request.dto';

@Injectable()
export class LocalSignupService implements IService<LocalSignupRequestDto, boolean> {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly passwordHasherService: PasswordHasherService,
        private readonly createUserService: CreateUserService,
        private readonly uniqueEmailIdentityValidatorService: UniqueEmailIdentityValidatorService,
        private readonly localSignupTokenService: LocalSignupTokenService,
        private readonly localSignupStorageService: LocalSignupStorageService,
        private readonly outboxEventPublisherService: OutboxEventPublisherService,
    ) {}

    @Transactional()
    async execute(input: LocalSignupRequestDto): Promise<boolean> {
        const payload = this.localSignupTokenService.verify(input.token);
        const email = payload.email;

        {
            let storedToken: string | null = null;
            try {
                storedToken = await this.localSignupStorageService.get(email);
            } catch {}

            if (storedToken !== input.token) {
                throw new BadRequestException();
            }
        }

        await this.uniqueEmailIdentityValidatorService.validate({
            email,
        });

        let hashedPassword: string;
        try {
            hashedPassword = await this.passwordHasherService.hash(input.password);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }

        const creationTime = getCurrentUTCTimestamp();

        const createdUser = await this.createUserService.execute({
            role: UserRoles.USER,
            createdAt: creationTime,
            updatedAt: creationTime,
        });

        const createdEmailIdentity = await this.commandBus.execute<
            CreateEmailIdentityCommand,
            ISelectEmailIdentity
        >(
            new CreateEmailIdentityCommand({
                email,
                userId: createdUser.id,
                createdAt: creationTime,
                updatedAt: creationTime,
            }),
        );

        await this.commandBus.execute<CreateLocalAccountCommand, ISelectLocalAccount>(
            new CreateLocalAccountCommand({
                hashedPassword,
                emailId: createdEmailIdentity.id,
                createdAt: creationTime,
                updatedAt: creationTime,
            }),
        );

        {
            const payload: ILocalSignupMessagePayload = {
                email,
            };

            await this.outboxEventPublisherService.publish({
                aggregateId: uuid(),
                aggregateType: AuthenticationResource.LOCAL_SIGNUP,
                eventType: 'created',
                payload,
                createdAt: creationTime,
            });
        }

        return true;
    }
}
