import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import { DrizzleRepository } from '@/infrastructure/database/drizzle/drizzle.repository';
import {
    toEntityOrNull,
    toEntityOrThrow,
} from '@/infrastructure/database/drizzle/drizzle.transformer';
import {
    receivers,
    type TInsertReceiver,
    type TSelectReceiver,
} from '@/modules/receiver/infrastructure/schemas/receiver.schema';

import type { IReceiverRepository } from '@/modules/receiver/domain/interfaces/receiverRepository.interface';

@Injectable()
export class ReceiverRepository extends DrizzleRepository implements IReceiverRepository {
    create(data: TInsertReceiver): Promise<TSelectReceiver> {
        return toEntityOrThrow(
            this.db.insert(receivers).values(data).returning(),
            'Unable to create',
        );
    }

    getByNameOrNull(name: string): Promise<TSelectReceiver | null> {
        return toEntityOrNull(this.db.select().from(receivers).where(eq(receivers.name, name)));
    }
}
