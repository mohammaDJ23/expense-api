import { Injectable, NotFoundException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { ExistsConsumerByUserIdAndIdQuery } from '@/modules/consumer/applications/queries/existsConsumerByUserIdAndId/existsConsumerByUserIdAndId.query';

import type { IValidatorService } from '@/core/interfaces/validatorService.interface';

interface IInput {
    userId: string;
    id: string;
}

@Injectable()
export class ConsumerExistenceValidatorService implements IValidatorService<IInput> {
    constructor(private readonly queryBus: QueryBus) {}

    async validate(input: IInput): Promise<void> {
        const exists = await this.queryBus.execute<ExistsConsumerByUserIdAndIdQuery, boolean>(
            new ExistsConsumerByUserIdAndIdQuery({
                userId: input.userId,
                id: input.id,
            }),
        );
        if (!exists) {
            throw new NotFoundException('Could not found the consumer');
        }
    }
}
