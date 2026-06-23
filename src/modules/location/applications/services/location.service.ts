import { Injectable } from '@nestjs/common';

import { CreateLocationService } from './createLocation.service';

import type { IdEntity } from '@/core/entities/id.entity';

@Injectable()
export class LocationService {
    constructor(private readonly createLocationService: CreateLocationService) {}

    create(userId: string, name: string): Promise<IdEntity> {
        return this.createLocationService.execute(userId, name);
    }
}
