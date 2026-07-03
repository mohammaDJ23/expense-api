import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Transactional } from '@nestjs-cls/transactional';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { isEmpty } from '@/common/utils/isEmpty.util';
import { IdEntity } from '@/core/entities/id.entity';
import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { CreateBillCommand } from '@/modules/bill/applications/commands/createBill/createBill.command';
import { CreateManyBillsConsumersCommand } from '@/modules/consumer/applications/commands/createManyBillsConsumers/createManyBillsConsumers.command';
import { ExistsConsumerByUserIdAndIdsQuery } from '@/modules/consumer/applications/queries/existsConsumerByUserIdAndIds/existsConsumerByUserIdAndIds.query';
import { ExistsLocationByUserIdAndIdQuery } from '@/modules/location/applications/queries/existsLocationByUserIdAndId/existsLocationByUserIdAndId.query';
import { CreateOutboxEventCommand } from '@/modules/outbox/applications/commands/createOutboxEvent/createOutboxEvent.command';
import { ExistsReceiverByUserIdAndIdQuery } from '@/modules/receiver/applications/queries/existsReceiverByUserIdAndId/existsReceiverByUserIdAndId.query';

import { FindBillByUserIdAndIdOrThrowService } from './findBillByUserIdAndIdOrThrow.service';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { IBillOutboxEvent } from '@/modules/bill/domain/interfaces/billOutboxEvent.interface';
import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';
import type { CreateBillRequestDto } from '@/modules/bill/interface/dtos/createBill.request.dto';
import type { ISelectBillConsumer } from '@/modules/consumer/infrastructure/schemas/billConsumer.schema';
import type { ISelectOutboxEvent } from '@/modules/outbox/infrastructure/schemas/outboxEvent.schema';

@Injectable()
export class CreateBillService implements IServiceHandler {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
        private readonly findBillByUserIdAndIdOrThrowService: FindBillByUserIdAndIdOrThrowService,
    ) {}

    @Transactional()
    async execute(data: CreateBillRequestDto, userId: string): Promise<IdEntity> {
        {
            const [existsReceiver, existsLocation, existsConsumer] = await Promise.all([
                this.queryBus.execute<ExistsReceiverByUserIdAndIdQuery, boolean>(
                    new ExistsReceiverByUserIdAndIdQuery({
                        userId,
                        id: data.receiverId,
                    }),
                ),
                this.queryBus.execute<ExistsLocationByUserIdAndIdQuery, boolean>(
                    new ExistsLocationByUserIdAndIdQuery({
                        userId,
                        id: data.locationId,
                    }),
                ),
                this.queryBus.execute<ExistsConsumerByUserIdAndIdsQuery, boolean>(
                    new ExistsConsumerByUserIdAndIdsQuery({
                        userId,
                        ids: data.consumerIds,
                    }),
                ),
            ]);

            if (!existsReceiver) {
                throw new BadRequestException('Could not found the receiver');
            }

            if (!existsLocation) {
                throw new BadRequestException('Could not found the location');
            }

            if (!existsConsumer) {
                throw new BadRequestException('Could not found the consumer');
            }
        }

        {
            const createdBill = await this.commandBus.execute<CreateBillCommand, ISelectBill>(
                new CreateBillCommand({
                    amount: data.amount,
                    description: data.description,
                    purchasedAt: data.purchasedAt ? getCurrentUTCTimestamp(data.purchasedAt) : null,
                    createdAt: getCurrentUTCTimestamp(),
                    updatedAt: getCurrentUTCTimestamp(),
                    userId,
                    locationId: data.locationId,
                    receiverId: data.receiverId,
                }),
            );

            {
                const createdBillsConsumers = await this.commandBus.execute<
                    CreateManyBillsConsumersCommand,
                    ISelectBillConsumer[]
                >(
                    new CreateManyBillsConsumersCommand({
                        billsConsumers: data.consumerIds.map((consumerId) => ({
                            billId: createdBill.id,
                            consumerId,
                            createdAt: getCurrentUTCTimestamp(),
                        })),
                    }),
                );

                if (isEmpty(createdBillsConsumers)) {
                    throw new ProcessFailedInternalServerErrorException();
                }
            }

            {
                const bill = await this.findBillByUserIdAndIdOrThrowService.execute(
                    userId,
                    createdBill.id,
                );

                await this.commandBus.execute<
                    CreateOutboxEventCommand<IBillOutboxEvent>,
                    ISelectOutboxEvent
                >(
                    new CreateOutboxEventCommand<IBillOutboxEvent>({
                        aggregateId: bill.id,
                        aggregateType: 'bills',
                        eventType: 'created',
                        payload: bill,
                        createdAt: getCurrentUTCTimestamp(),
                    }),
                );
            }

            return IdEntity.create(createdBill.id);
        }
    }
}
