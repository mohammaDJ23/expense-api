import { BadRequestException, Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { ExistsConsumerByUserIdAndIdsQuery } from '@/modules/consumer/applications/queries/existsConsumerByUserIdAndIds/existsConsumerByUserIdAndIds.query';

import type { IValidatorService } from '@/core/interfaces/validatorService.interface';

interface IInput {
    userId: string;
    ids: string[];
}

@Injectable()
export class ConsumersExistenceValidatorService implements IValidatorService<IInput> {
    constructor(private readonly queryBus: QueryBus) {}

    async validate(input: IInput): Promise<void> {
        const exists = await this.queryBus.execute<ExistsConsumerByUserIdAndIdsQuery, boolean>(
            new ExistsConsumerByUserIdAndIdsQuery({
                userId: input.userId,
                ids: input.ids,
            }),
        );
        if (!exists) {
            throw new BadRequestException('Could not found the consumer');
        }
    }
}
