import { Injectable } from '@nestjs/common';

import { BillSearchSyncService } from '@/modules/bill/applications/services/search/billSearchSync.service';
import { ConsumerSearchSyncService } from '@/modules/consumer/applications/services/search/consumerSearchSync.service';
import { LocationSearchSyncService } from '@/modules/location/applications/services/search/locationSearchSync.service';
import { ReceiverSearchSyncService } from '@/modules/receiver/applications/services/search/receiverSearchSync.service';

import type { IService } from '@/core/interfaces/service.interface';

interface IInput {
    userId: string;
}

@Injectable()
export class SearchSyncService implements IService<IInput, boolean> {
    constructor(
        private readonly billSearchSyncService: BillSearchSyncService,
        private readonly consumerSearchSyncService: ConsumerSearchSyncService,
        private readonly locationSearchSyncService: LocationSearchSyncService,
        private readonly receiverSearchSyncService: ReceiverSearchSyncService,
    ) {}

    async execute(input: IInput): Promise<boolean> {
        await Promise.all([
            this.billSearchSyncService.sync(input.userId),
            this.consumerSearchSyncService.sync(input.userId),
            this.locationSearchSyncService.sync(input.userId),
            this.receiverSearchSyncService.sync(input.userId),
        ]);
        return true;
    }
}
