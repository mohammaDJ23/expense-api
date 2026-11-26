import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { ProjectionService } from '@/core/services/projection.service';
import { ElasticSearchService } from '@/infrastructure/elasticsearch/elasticsearch.service';
import { BillCacheInvalidatorService } from '@/modules/bill/infrastructure/cache/billCacheInvalidator.service';
import { DeleteBillsElasticsearchQuery } from '@/modules/bill/infrastructure/elasticsearch/deleteBillsElasticsearch.query';
import { ConsumerCacheInvalidatorService } from '@/modules/consumer/infrastructure/cache/consumerCacheInvalidator.service';
import { DeleteConsumersElasticsearchQuery } from '@/modules/consumer/infrastructure/elasticsearch/deleteConsumersElasticsearch.query';
import { LocationCacheInvalidatorService } from '@/modules/location/infrastructure/cache/locationCacheInvalidator.service';
import { DeleteLocationsElasticsearchQuery } from '@/modules/location/infrastructure/elasticsearch/deleteLocationsElasticsearch.query';
import { ReceiverCacheInvalidatorService } from '@/modules/receiver/infrastructure/cache/receiverCacheInvalidator.service';
import { DeleteReceiversElasticsearchQuery } from '@/modules/receiver/infrastructure/elasticsearch/deleteReceiversElasticsearch.query';
import { DeleteUserCommand } from '@/modules/user/applications/commands/deleteUser/deleteUser.command';
import { UserExistenceValidatorService } from '@/modules/user/applications/services/validators/userExistenceValidator.service';
import { UserCacheInvalidatorService } from '@/modules/user/infrastructure/cache/userCacheInvalidator.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { IId } from '@/core/types/id.type';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

interface IInput {
    userId: string;
}

@Injectable()
export class DeleteUserService implements IService<IInput, IId> {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly userExistenceValidatorService: UserExistenceValidatorService,
        private readonly userCacheInvalidatorService: UserCacheInvalidatorService,
        private readonly projectionService: ProjectionService,
        private readonly elasticsearchService: ElasticSearchService,
        private readonly billCacheInvalidatorService: BillCacheInvalidatorService,
        private readonly deleteBillsElasticsearchQuery: DeleteBillsElasticsearchQuery,
        private readonly consumerCacheInvalidatorService: ConsumerCacheInvalidatorService,
        private readonly deleteConsumersElasticsearchQuery: DeleteConsumersElasticsearchQuery,
        private readonly locationCacheInvalidatorService: LocationCacheInvalidatorService,
        private readonly deleteLocationsElasticsearchQuery: DeleteLocationsElasticsearchQuery,
        private readonly receiverCacheInvalidatorService: ReceiverCacheInvalidatorService,
        private readonly deleteReceiversElasticsearchQuery: DeleteReceiversElasticsearchQuery,
    ) {}

    async execute(input: IInput): Promise<IId> {
        const deletedUser = await this.delete(input);

        await this.projectionService.execute([
            this.userCacheInvalidatorService.execute(),
            this.billCacheInvalidatorService.execute({ userId: input.userId }),
            this.elasticsearchService.deleteByQuery(
                this.deleteBillsElasticsearchQuery.buildQuery({ userId: input.userId }),
            ),
            this.consumerCacheInvalidatorService.execute({ userId: input.userId }),
            this.elasticsearchService.deleteByQuery(
                this.deleteConsumersElasticsearchQuery.buildQuery({ userId: input.userId }),
            ),
            this.locationCacheInvalidatorService.execute({ userId: input.userId }),
            this.elasticsearchService.deleteByQuery(
                this.deleteLocationsElasticsearchQuery.buildQuery({ userId: input.userId }),
            ),
            this.receiverCacheInvalidatorService.execute({ userId: input.userId }),
            this.elasticsearchService.deleteByQuery(
                this.deleteReceiversElasticsearchQuery.buildQuery({ userId: input.userId }),
            ),
        ]);

        return deletedUser;
    }

    async delete(input: IInput): Promise<ISelectUser> {
        await this.userExistenceValidatorService.validate({ userId: input.userId });

        return this.commandBus.execute<DeleteUserCommand, ISelectUser>(
            new DeleteUserCommand({
                userId: input.userId,
            }),
        );
    }
}
