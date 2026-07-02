import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { IdEntity } from '@/core/entities/id.entity';
import { DeleteUserCommand } from '@/modules/user/applications/commands/deleteUser/deleteUser.command';
import { IsUserExistsByIdQuery } from '@/modules/user/applications/queries/isUserExistsById/isUserExistsById.query';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class DeleteUserService implements IServiceHandler {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
    ) {}

    async execute(userId: string): Promise<IdEntity> {
        {
            const isExists = await this.queryBus.execute<IsUserExistsByIdQuery, boolean>(
                new IsUserExistsByIdQuery(userId),
            );
            if (!isExists) {
                throw new BadRequestException('Could not found the user');
            }
        }

        {
            const deletedUser = await this.commandBus.execute<DeleteUserCommand, ISelectUser>(
                new DeleteUserCommand({ userId }),
            );
            return IdEntity.create(deletedUser.id);
        }
    }
}
