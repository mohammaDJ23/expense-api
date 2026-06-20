import { Injectable } from '@nestjs/common';
import { TransactionHost } from '@nestjs-cls/transactional';

import type { TransactionalAdapterDrizzleOrm } from '@nestjs-cls/transactional-adapter-drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

@Injectable()
export class DrizzleRepository {
    constructor(
        protected readonly txHost: TransactionHost<TransactionalAdapterDrizzleOrm<NodePgDatabase>>,
    ) {}

    get db(): NodePgDatabase {
        return this.txHost.tx;
    }
}
