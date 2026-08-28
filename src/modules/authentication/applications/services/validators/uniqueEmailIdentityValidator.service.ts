import { ConflictException, Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { ExistsEmailIdentityByEmailQuery } from '@/modules/authentication/applications/queries/existsEmailIdentityByEmail/existsEmailIdentityByEmail.query';

import type { IValidatorService } from '@/core/interfaces/validatorService.interface';

interface IInput {
    email: string;
}

@Injectable()
export class UniqueEmailIdentityValidatorService implements IValidatorService<IInput> {
    constructor(private readonly queryBus: QueryBus) {}

    async validate(input: IInput): Promise<void> {
        const exists = await this.queryBus.execute<ExistsEmailIdentityByEmailQuery, boolean>(
            new ExistsEmailIdentityByEmailQuery({
                email: input.email,
            }),
        );
        if (exists) {
            throw new ConflictException('The email already exists.');
        }
    }
}
