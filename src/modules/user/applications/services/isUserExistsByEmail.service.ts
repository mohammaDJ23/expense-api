import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { IsUserExistsByEmailQuery } from '@/modules/user/applications/queries/isUserExistsByEmail/isUserExistsByEmail.query';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';

@Injectable()
export class IsUserExistsByEmailService implements IServiceHandler {
    constructor(private readonly queryBus: QueryBus) {}

    async execute(email: string): Promise<boolean> {
        try {
            const isUserExistsByEmailQuery = new IsUserExistsByEmailQuery(email);
            return await this.queryBus.execute<IsUserExistsByEmailQuery, boolean>(
                isUserExistsByEmailQuery,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
