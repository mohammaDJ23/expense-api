import { Injectable } from '@nestjs/common';

import { QueryCacheInvalidatorService } from '@/core/features/queryCache/queryCacheInvalidator.service';
import { ReceiverResource } from '@/modules/receiver/domain/enums/receiver.enum';

import type { IService } from '@/core/interfaces/service.interface';

interface IInput {
    userId: string;
}

@Injectable()
export class ReceiverCacheInvalidatorService implements IService<IInput, void> {
    constructor(private readonly queryCacheInvalidatorService: QueryCacheInvalidatorService) {}

    async execute(input: IInput): Promise<void> {
        await this.queryCacheInvalidatorService.invalidateScope(
            ReceiverResource.RECEIVER,
            input.userId,
        );
    }
}
