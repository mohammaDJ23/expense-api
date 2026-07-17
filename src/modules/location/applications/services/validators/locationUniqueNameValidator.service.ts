import { ConflictException, Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { ExistsLocationByUserIdAndExcludingIdAndNameQuery } from '@/modules/location/applications/queries/existsLocationByUserIdAndExcludingIdAndName/existsLocationByUserIdAndExcludingIdAndName.query';

import type { IValidatorService } from '@/core/interfaces/validatorService.interface';

interface IInput {
    userId: string;
    excludingId: string;
    name: string;
}

@Injectable()
export class LocationUniqueNameValidatorService implements IValidatorService<IInput> {
    constructor(private readonly queryBus: QueryBus) {}

    async validate(input: IInput): Promise<void> {
        const exists = await this.queryBus.execute<
            ExistsLocationByUserIdAndExcludingIdAndNameQuery,
            boolean
        >(
            new ExistsLocationByUserIdAndExcludingIdAndNameQuery({
                userId: input.userId,
                excludingId: input.excludingId,
                name: input.name,
            }),
        );
        if (exists) {
            throw new ConflictException('The location already exists');
        }
    }
}
