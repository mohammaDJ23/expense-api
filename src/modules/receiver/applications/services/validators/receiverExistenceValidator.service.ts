import { BadRequestException, Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { ExistsReceiverByUserIdAndIdQuery } from '@/modules/receiver/applications/queries/existsReceiverByUserIdAndId/existsReceiverByUserIdAndId.query';

import type { IValidatorService } from '@/core/interfaces/validators/validatorService.interface';

interface IInput {
    userId: string;
    id: string;
}

@Injectable()
export class ReceiverExistenceValidatorService implements IValidatorService<IInput> {
    constructor(private readonly queryBus: QueryBus) {}

    async validate(input: IInput): Promise<void> {
        const exists = await this.queryBus.execute<ExistsReceiverByUserIdAndIdQuery, boolean>(
            new ExistsReceiverByUserIdAndIdQuery({
                userId: input.userId,
                id: input.id,
            }),
        );
        if (!exists) {
            throw new BadRequestException('Could not found the receiver');
        }
    }
}
