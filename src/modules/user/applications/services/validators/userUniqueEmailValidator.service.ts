import { ConflictException, Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { IsUserExistsByEmailQuery } from '@/modules/user/applications/queries/isUserExistsByEmail/isUserExistsByEmail.query';

import type { IValidatorService } from '@/core/interfaces/validatorService.interface';

interface IInput {
    email: string;
}

@Injectable()
export class UserUniqueEmailValidatorService implements IValidatorService<IInput> {
    constructor(private readonly queryBus: QueryBus) {}

    async validate(input: IInput): Promise<void> {
        const exists = await this.queryBus.execute<IsUserExistsByEmailQuery, boolean>(
            new IsUserExistsByEmailQuery({
                email: input.email,
            }),
        );
        if (exists) {
            throw new ConflictException('The email already exists.');
        }
    }
}
