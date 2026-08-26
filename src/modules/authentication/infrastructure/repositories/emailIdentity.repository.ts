import { Injectable } from '@nestjs/common';

import { DrizzleRepository } from '@/infrastructure/database/drizzle/drizzle.repository';
import { toEntityOrThrow } from '@/infrastructure/database/drizzle/transformers/toEntityOrThrow.transformer';
import {
    emailIdentities,
    type IInsertEmailIdentity,
    type ISelectEmailIdentity,
} from '@/modules/authentication/infrastructure/schemas/emailIdentity.schema';

import type { IEmailIdentityRepository } from '@/modules/authentication/domain/interfaces/emailIdentityRepository.interface';

@Injectable()
export class EmailIdentityRepository implements IEmailIdentityRepository {
    constructor(private readonly drizzleRepository: DrizzleRepository) {}

    create(data: IInsertEmailIdentity): Promise<ISelectEmailIdentity> {
        return toEntityOrThrow(
            this.drizzleRepository.db.insert(emailIdentities).values(data).returning().execute(),
            'Unable to create',
        );
    }
}
