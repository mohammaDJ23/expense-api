import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { IdEntity } from '@/core/entities/id.entity';
import { DeleteUserCommand } from '@/modules/user/applications/commands/deleteUser/deleteUser.command';
import { UserExistenceValidatorService } from '@/modules/user/applications/services/validators/userExistenceValidator.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

interface IInput {
    userId: string;
}

@Injectable()
export class DeleteUserService implements IService<IInput, IdEntity> {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly userExistenceValidatorService: UserExistenceValidatorService,
    ) {}

    async execute(input: IInput): Promise<IdEntity> {
        await this.userExistenceValidatorService.validate({ userId: input.userId });

        const deletedUser = await this.commandBus.execute<DeleteUserCommand, ISelectUser>(
            new DeleteUserCommand({
                userId: input.userId,
            }),
        );

        return IdEntity.create(deletedUser.id);
    }
}
