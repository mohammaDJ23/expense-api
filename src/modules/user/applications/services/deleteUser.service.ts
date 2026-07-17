import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { IdEntity } from '@/core/entities/id.entity';
import { DeleteUserCommand } from '@/modules/user/applications/commands/deleteUser/deleteUser.command';
import { ExistsUserByIdQuery } from '@/modules/user/applications/queries/existsUserById/existsUserById.query';

import type { IService } from '@/core/interfaces/service.interface';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

interface IInput {
    userId: string;
}

@Injectable()
export class DeleteUserService implements IService<IInput, IdEntity> {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
    ) {}

    async execute(input: IInput): Promise<IdEntity> {
        {
            const isExists = await this.queryBus.execute<ExistsUserByIdQuery, boolean>(
                new ExistsUserByIdQuery({
                    id: input.userId,
                }),
            );
            if (!isExists) {
                throw new BadRequestException('Could not found the user');
            }
        }

        {
            const deletedUser = await this.commandBus.execute<DeleteUserCommand, ISelectUser>(
                new DeleteUserCommand({
                    userId: input.userId,
                }),
            );
            return IdEntity.create(deletedUser.id);
        }
    }
}
