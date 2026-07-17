import { Injectable, NotFoundException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { ExistsLocationByUserIdAndIdQuery } from '@/modules/location/applications/queries/existsLocationByUserIdAndId/existsLocationByUserIdAndId.query';

import type { IValidatorService } from '@/core/interfaces/validatorService.interface';

interface IInput {
    userId: string;
    id: string;
}

@Injectable()
export class LocationExistenceValidatorService implements IValidatorService<IInput> {
    constructor(private readonly queryBus: QueryBus) {}

    async validate(input: IInput): Promise<void> {
        const exists = await this.queryBus.execute<ExistsLocationByUserIdAndIdQuery, boolean>(
            new ExistsLocationByUserIdAndIdQuery({
                userId: input.userId,
                id: input.id,
            }),
        );
        if (!exists) {
            throw new NotFoundException('Could not found the location');
        }
    }
}
