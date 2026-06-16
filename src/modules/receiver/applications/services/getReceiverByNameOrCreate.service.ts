import { Injectable } from '@nestjs/common';

import { CreateReceiverService } from '@/modules/receiver/applications/services/createReceiver.service';
import { GetReceiverByNameOrNullService } from '@/modules/receiver/applications/services/getReceiverByNameOrNull.service';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { TSelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

@Injectable()
export class GetReceiverByNameOrCreateService implements IServiceHandler {
    constructor(
        private readonly createReceiverService: CreateReceiverService,
        private readonly getReceiverByNameOrNullService: GetReceiverByNameOrNullService,
    ) {}

    async execute(name: string): Promise<TSelectReceiver> {
        const receiver = await this.getReceiverByNameOrNullService.execute(name);
        if (receiver) {
            return receiver;
        }
        return this.createReceiverService.execute(name);
    }
}
