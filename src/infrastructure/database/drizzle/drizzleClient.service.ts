import { Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { DrizzleConnectionService } from './drizzleConnection.service';

@Injectable()
export class DrizzleClientService {
    constructor(private readonly drizzleConnectionService: DrizzleConnectionService) {}

    get db(): NodePgDatabase {
        return this.drizzleConnectionService.getDatabase();
    }
}
