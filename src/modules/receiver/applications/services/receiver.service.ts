import { Injectable } from '@nestjs/common';

import { CreateReceiverService } from './createReceiver.service';

import type { IdEntity } from '@/core/entities/id.entity';

@Injectable()
export class ReceiverService {
    constructor(private readonly createReceiverService: CreateReceiverService) {}

    create(userId: string, name: string): Promise<IdEntity> {
        return this.createReceiverService.execute(userId, name);
    }
}
