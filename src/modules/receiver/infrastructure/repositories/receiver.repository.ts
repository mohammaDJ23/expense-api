import { Injectable } from '@nestjs/common';
import { eq, sql } from 'drizzle-orm';

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
            this.db.insert(receivers).values(data).returning().prepare('create_receiver').execute(),
            'Unable to create',
        );
    }

    getByNameOrNull(name: string): Promise<TSelectReceiver | null> {
        return toEntityOrNull(
            this.db
                .select()
                .from(receivers)
                .where(eq(receivers.name, sql.placeholder('name')))
                .prepare('get_receiver_by_name')
                .execute({ name }),
        );
    }

    getByIdOrThrow(id: string): Promise<TSelectReceiver> {
        return toEntityOrThrow(
            this.db
                .select()
                .from(receivers)
                .where(eq(receivers.id, sql.placeholder('id')))
                .prepare('get_receiver_by_id_or_throw')
                .execute({ id }),
            'Unable to find',
        );
    }
}
