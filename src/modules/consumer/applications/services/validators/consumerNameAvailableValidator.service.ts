import { ConflictException, Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { ExistsConsumerByUserIdAndNameQuery } from '@/modules/consumer/applications/queries/existsConsumerByUserIdAndName/existsConsumerByUserIdAndName.query';

import type { IValidatorService } from '@/core/interfaces/validatorService.interface';

interface IInput {
    userId: string;
    name: string;
}

@Injectable()
export class ConsumerNameAvailableValidatorService implements IValidatorService<IInput> {
    constructor(private readonly queryBus: QueryBus) {}

    async validate(input: IInput): Promise<void> {
        const exists = await this.queryBus.execute<ExistsConsumerByUserIdAndNameQuery, boolean>(
            new ExistsConsumerByUserIdAndNameQuery({
                userId: input.userId,
                name: input.name,
            }),
        );
        if (exists) {
            throw new ConflictException('The consumer already exists');
        }
    }
}
