import { Injectable } from '@nestjs/common';

import { CreateConsumerService } from './createConsumer.service';

import type { IdEntity } from '@/core/entities/id.entity';

@Injectable()
export class ConsumerService {
    constructor(private readonly createConsumerService: CreateConsumerService) {}

    create(userId: string, name: string): Promise<IdEntity> {
        return this.createConsumerService.execute(userId, name);
    }
}
