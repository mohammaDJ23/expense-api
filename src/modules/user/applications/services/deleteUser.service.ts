import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { DeleteUserCommand } from '@/modules/user/applications/commands/deleteUser/deleteUser.command';
import { UserExistenceValidatorService } from '@/modules/user/applications/services/validators/userExistenceValidator.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { IId } from '@/core/types/id.type';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

interface IInput {
    userId: string;
}

@Injectable()
export class DeleteUserService implements IService<IInput, IId> {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly userExistenceValidatorService: UserExistenceValidatorService,
    ) {}

    async execute(input: IInput): Promise<IId> {
        await this.userExistenceValidatorService.validate({ userId: input.userId });

        const deletedUser = await this.commandBus.execute<DeleteUserCommand, ISelectUser>(
            new DeleteUserCommand({
                userId: input.userId,
            }),
        );

        return {
            id: deletedUser.id,
        };
    }
}
