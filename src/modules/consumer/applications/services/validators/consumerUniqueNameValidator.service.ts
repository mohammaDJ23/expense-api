import { ConflictException, Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { ExistsConsumerByUserIdAndExcludingIdAndNameQuery } from '@/modules/consumer/applications/queries/existsConsumerByUserIdAndExcludingIdAndName/existsConsumerByUserIdAndExcludingIdAndName.query';

import type { IValidatorService } from '@/core/interfaces/validatorService.interface';

interface IInput {
    userId: string;
    excludingId: string;
    name: string;
}

@Injectable()
export class ConsumerUniqueNameValidatorService implements IValidatorService<IInput> {
    constructor(private readonly queryBus: QueryBus) {}

    async validate(input: IInput): Promise<void> {
        const exists = await this.queryBus.execute<
            ExistsConsumerByUserIdAndExcludingIdAndNameQuery,
            boolean
        >(
            new ExistsConsumerByUserIdAndExcludingIdAndNameQuery({
                userId: input.userId,
                excludingId: input.excludingId,
                name: input.name,
            }),
        );
        if (exists) {
            throw new ConflictException('The consumer already exists');
        }
    }
}
