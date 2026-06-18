import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { GetManyUsersQuery } from '@/modules/user/applications/queries/getManyUsers/getManyUsers.query';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { TSelectUser } from '@/modules/user/infrastructure/schemas/user.schema';
import type { GetManyUsersRequestDto } from '@/modules/user/interfaces/dtos/getManyUsers.request.dto';

@Injectable()
export class GetManyUsersService implements IServiceHandler {
    constructor(private readonly queryBus: QueryBus) {}

    async execute(option: GetManyUsersRequestDto): Promise<TSelectUser[]> {
        try {
            const getManyUsersQuery = new GetManyUsersQuery(option.offset, option.limit);
            return await this.queryBus.execute<GetManyUsersQuery, TSelectUser[]>(getManyUsersQuery);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
