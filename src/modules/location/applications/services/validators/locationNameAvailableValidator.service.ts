import { ConflictException, Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { ExistsLocationByUserIdAndNameQuery } from '@/modules/location/applications/queries/existsLocationByUserIdAndName/existsLocationByUserIdAndName.query';

import type { IValidatorService } from '@/core/interfaces/validatorService.interface';

interface IInput {
    userId: string;
    name: string;
}

@Injectable()
export class LocationNameAvailableValidatorService implements IValidatorService<IInput> {
    constructor(private readonly queryBus: QueryBus) {}

    async validate(input: IInput): Promise<void> {
        const exists = await this.queryBus.execute<ExistsLocationByUserIdAndNameQuery, boolean>(
            new ExistsLocationByUserIdAndNameQuery({
                userId: input.userId,
                name: input.name,
            }),
        );
        if (exists) {
            throw new ConflictException('The location already exists');
        }
    }
}
