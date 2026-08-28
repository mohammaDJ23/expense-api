import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Transactional } from '@nestjs-cls/transactional';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { getCurrentUTCTimestamp } from '@/core/utils/getCurrentUTCTimestamp.util';
import { CreateEmailIdentityCommand } from '@/modules/authentication/applications/commands/createEmailIdentity/createEmailIdentity.command';
import { CreateLocalAccountCommand } from '@/modules/authentication/applications/commands/createLocalAccount/createLocalAccount.command';
import { UniqueEmailIdentityValidatorService } from '@/modules/authentication/applications/services/validators/uniqueEmailIdentityValidator.service';
import { AuthenticationResource } from '@/modules/authentication/authentication.enum';
import { OutboxEventPublisherService } from '@/modules/outbox/applications/services/outboxEventPublisher.service';
import { CreateUserService } from '@/modules/user/applications/services/createUser.service';
import { AuthProvider } from '@/modules/user/domain/enums/authProvider.enum';
import { UserRoles } from '@/modules/user/domain/enums/userRoles.enum';

import { PasswordHasherService } from './passwordHasher.service';
import { VerificationTokenService } from './verificationToken.service';

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
        private readonly verificationTokenService: VerificationTokenService,
        private readonly outboxEventPublisherService: OutboxEventPublisherService,
    ) {}

    @Transactional()
    async execute(input: LocalSignupRequestDto): Promise<boolean> {
        await this.uniqueEmailIdentityValidatorService.validate({
            email: input.email,
        });

        let hashedPassword: string;
        try {
            hashedPassword = await this.passwordHasherService.hash(input.password);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }

        const createdAt = getCurrentUTCTimestamp();

        const createdUser = await this.createUserService.execute({
            email: input.email,
            hashedPassword,
            role: UserRoles.USER,
            authProvider: AuthProvider.LOCAL,
            createdAt,
            updatedAt: createdAt,
        });

        const createdEmailIdentity = await this.commandBus.execute<
            CreateEmailIdentityCommand,
            ISelectEmailIdentity
        >(
            new CreateEmailIdentityCommand({
                email: input.email,
                userId: createdUser.id,
                createdAt,
                updatedAt: createdAt,
            }),
        );

        await this.commandBus.execute<CreateLocalAccountCommand, ISelectLocalAccount>(
            new CreateLocalAccountCommand({
                hashedPassword,
                emailId: createdEmailIdentity.id,
                createdAt,
                updatedAt: createdAt,
            }),
        );

        const token = this.verificationTokenService.sign(createdUser);
        const payload: ILocalSignupMessagePayload = {
            email: input.email,
            token,
        };

        await this.outboxEventPublisherService.publish({
            aggregateId: createdUser.id,
            aggregateType: AuthenticationResource.LOCAL_SIGNUP,
            eventType: 'created',
            payload,
            createdAt,
        });

        return true;
    }
}
