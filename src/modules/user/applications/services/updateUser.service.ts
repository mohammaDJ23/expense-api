import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { IdEntity } from '@/core/entities/id.entity';
import { UpdateUserCommand } from '@/modules/user/applications/commands/updateUser/updateUser.command';
import { ExistsUserByIdQuery } from '@/modules/user/applications/queries/existsUserById/existsUserById.query';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';
import type { UpdateUserRequestDto } from '@/modules/user/interfaces/dtos/updateUser.request.dto';

@Injectable()
export class UpdateUserService implements IServiceHandler {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
    ) {}

    async execute(userId: string, data: UpdateUserRequestDto): Promise<IdEntity> {
        {
            const isExists = await this.queryBus.execute<ExistsUserByIdQuery, boolean>(
                new ExistsUserByIdQuery({
                    id: userId,
                }),
            );
            if (!isExists) {
                throw new BadRequestException('Could not found the user');
            }
        }

        {
            const updatedUser = await this.commandBus.execute<UpdateUserCommand, ISelectUser>(
                new UpdateUserCommand({
                    id: userId,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    phone: data.phone,
                    updatedAt: getCurrentUTCTimestamp(),
                }),
            );
            return IdEntity.create(updatedUser.id);
        }
    }
}
