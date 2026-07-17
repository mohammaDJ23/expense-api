import { ConflictException, Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { ExistsReceiverByUserIdAndNameQuery } from '@/modules/receiver/applications/queries/existsReceiverByUserIdAndName/existsReceiverByUserIdAndName.query';

import type { IValidatorService } from '@/core/interfaces/validatorService.interface';

interface IInput {
    userId: string;
    name: string;
}

@Injectable()
export class ReceiverNameAvailableValidatorService implements IValidatorService<IInput> {
    constructor(private readonly queryBus: QueryBus) {}

    async validate(input: IInput): Promise<void> {
        const exists = await this.queryBus.execute<ExistsReceiverByUserIdAndNameQuery, boolean>(
            new ExistsReceiverByUserIdAndNameQuery({
                userId: input.userId,
                name: input.name,
            }),
        );
        if (exists) {
            throw new ConflictException('The receiver already exists');
        }
    }
}
