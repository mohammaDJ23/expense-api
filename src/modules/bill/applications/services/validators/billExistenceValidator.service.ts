import { BadRequestException, Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { ExistsBillByUserIdAndIdQuery } from '@/modules/bill/applications/queries/existsBillByUserIdAndId/existsBillByUserIdAndId.query';

import type { IValidatorService } from '@/core/interfaces/validators/validatorService.interface';

interface IInput {
    userId: string;
    id: string;
}

@Injectable()
export class BillExistenceValidatorService implements IValidatorService<IInput> {
    constructor(private readonly queryBus: QueryBus) {}

    async validate(input: IInput): Promise<void> {
        const exists = await this.queryBus.execute<ExistsBillByUserIdAndIdQuery, boolean>(
            new ExistsBillByUserIdAndIdQuery({
                userId: input.userId,
                id: input.id,
            }),
        );
        if (!exists) {
            throw new BadRequestException('Could not found the bill');
        }
    }
}
