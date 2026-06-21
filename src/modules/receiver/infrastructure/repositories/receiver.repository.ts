import { Injectable } from '@nestjs/common';
import { eq, inArray } from 'drizzle-orm';

import { DrizzleRepository } from '@/infrastructure/database/drizzle/drizzle.repository';
import {
    toEntities,
    toEntityOrNull,
    toEntityOrThrow,
} from '@/infrastructure/database/drizzle/drizzle.transformer';
import {
    receivers,
    type IInsertReceiver,
    type ISelectReceiver,
} from '@/modules/receiver/infrastructure/schemas/receiver.schema';

import type { IReceiverRepository } from '@/modules/receiver/domain/interfaces/receiverRepository.interface';

@Injectable()
export class ReceiverRepository implements IReceiverRepository {
    constructor(private readonly drizzleRepository: DrizzleRepository) {}

    create(data: IInsertReceiver): Promise<ISelectReceiver> {
        return toEntityOrThrow(
            this.drizzleRepository.db.insert(receivers).values(data).returning().execute(),
            'Unable to create',
        );
    }

    findByNameOrNull(name: string): Promise<ISelectReceiver | null> {
        return toEntityOrNull(
            this.drizzleRepository.db
                .select()
                .from(receivers)
                .where(eq(receivers.name, name))
                .execute(),
        );
    }

    findByIdOrThrow(id: string): Promise<ISelectReceiver> {
        return toEntityOrThrow(
            this.drizzleRepository.db
                .select()
                .from(receivers)
                .where(eq(receivers.id, id))
                .execute(),
            'Unable to find',
        );
    }

    findManyByIds(ids: string[]): Promise<ISelectReceiver[]> {
        return toEntities(
            this.drizzleRepository.db
                .select()
                .from(receivers)
                .where(inArray(receivers.id, ids))
                .execute(),
        );
    }
}
