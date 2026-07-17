import { Injectable, NotFoundException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { ExistsUserByIdQuery } from '@/modules/user/applications/queries/existsUserById/existsUserById.query';

import type { IValidatorService } from '@/core/interfaces/validatorService.interface';

interface IInput {
    userId: string;
}

@Injectable()
export class UserExistenceValidatorService implements IValidatorService<IInput> {
    constructor(private readonly queryBus: QueryBus) {}

    async validate(input: IInput): Promise<void> {
        const exists = await this.queryBus.execute<ExistsUserByIdQuery, boolean>(
            new ExistsUserByIdQuery({
                id: input.userId,
            }),
        );
        if (!exists) {
            throw new NotFoundException('Could not found the user');
        }
    }
}
