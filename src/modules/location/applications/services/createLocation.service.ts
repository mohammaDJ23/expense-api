import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { IdEntity } from '@/core/entities/id.entity';
import { CreateLocationCommand } from '@/modules/location/applications/commands/createLocation/createLocation.command';
import { FindLocationByUserIdAndNameOrNullQuery } from '@/modules/location/applications/queries/findLocationByUserIdAndNameOrNull/findLocationByUserIdAndNameOrNull.query';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';

@Injectable()
export class CreateLocationService implements IServiceHandler {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
    ) {}

    async execute(userId: string, name: string): Promise<IdEntity> {
        const location = await this.queryBus.execute<
            FindLocationByUserIdAndNameOrNullQuery,
            ISelectLocation | null
        >(new FindLocationByUserIdAndNameOrNullQuery(userId, name));

        if (!location) {
            const createdLocation = await this.commandBus.execute<
                CreateLocationCommand,
                ISelectLocation
            >(
                new CreateLocationCommand({
                    name,
                    userId,
                    createdAt: getCurrentUTCTimestamp(),
                    updatedAt: getCurrentUTCTimestamp(),
                }),
            );
            return IdEntity.create(createdLocation.id);
        }

        throw new BadRequestException('You already have the location');
    }
}
