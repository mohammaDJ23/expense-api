import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Transactional } from '@nestjs-cls/transactional';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { isEmpty } from '@/common/utils/isEmpty.util';
import { isNotEmpty } from '@/common/utils/isNotEmpty.util';
import { IdEntity } from '@/core/entities/id.entity';
import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { UpdateBillCommand } from '@/modules/bill/applications/commands/updateBill/updateBill.command';
import { ExistsBillByUserIdAndIdQuery } from '@/modules/bill/applications/queries/existsBillByUserIdAndId/existsBillByUserIdAndId.query';
import { CreateManyBillsConsumersCommand } from '@/modules/consumer/applications/commands/createManyBillsConsumers/createManyBillsConsumers.command';
import { DeleteManyBillsConsumersCommand } from '@/modules/consumer/applications/commands/deleteManyBillsConsumers/deleteManyBillsConsumers.command';
import { FindManyBillsConsumersByRefIdQuery } from '@/modules/consumer/applications/queries/findManyBillsConsumersByRefId/findManyBillsConsumersByRefId.query';
import { IsConsumerExistsByUserIdAndIdsQuery } from '@/modules/consumer/applications/queries/isConsumerExistsByUserIdAndIds/isConsumerExistsByUserIdAndIds.query';
import { ExistsLocationByUserIdAndIdQuery } from '@/modules/location/applications/queries/existsLocationByUserIdAndId/existsLocationByUserIdAndId.query';
import { CreateOutboxEventCommand } from '@/modules/outbox/applications/commands/createOutboxEvent/createOutboxEvent.command';
import { ExistsReceiverByUserIdAndIdQuery } from '@/modules/receiver/applications/queries/existsReceiverByUserIdAndId/existsReceiverByUserIdAndId.query';

import { FindBillByUserIdAndIdOrThrowService } from './findBillByUserIdAndIdOrThrow.service';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { IBillOutboxEvent } from '@/modules/bill/domain/interfaces/billOutboxEvent.interface';
import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';
import type { UpdateBillRequestDto } from '@/modules/bill/interface/dtos/updateBill.request.dto';
import type { ISelectBillConsumer } from '@/modules/consumer/infrastructure/schemas/billConsumer.schema';
import type { ISelectOutboxEvent } from '@/modules/outbox/infrastructure/schemas/outboxEvent.schema';

@Injectable()
export class UpdateBillService implements IServiceHandler {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
        private readonly findBillByUserIdAndIdOrThrowService: FindBillByUserIdAndIdOrThrowService,
    ) {}

    @Transactional()
    async execute(data: UpdateBillRequestDto, userId: string): Promise<IdEntity> {
        {
            const exists = await this.queryBus.execute<ExistsBillByUserIdAndIdQuery, boolean>(
                new ExistsBillByUserIdAndIdQuery({
                    userId,
                    id: data.id,
                }),
            );
            if (!exists) {
                throw new BadRequestException('Could not found the bill');
            }
        }

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
                this.queryBus.execute<IsConsumerExistsByUserIdAndIdsQuery, boolean>(
                    new IsConsumerExistsByUserIdAndIdsQuery({
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
            const billsConsumers = await this.queryBus.execute<
                FindManyBillsConsumersByRefIdQuery,
                ISelectBillConsumer[]
            >(
                new FindManyBillsConsumersByRefIdQuery({
                    billId: data.id,
                }),
            );

            if (isEmpty(billsConsumers)) {
                throw new ProcessFailedInternalServerErrorException();
            }

            {
                const existenceConsumerIds = billsConsumers.map(
                    (billConsumer) => billConsumer.consumerId,
                );

                const receivedConsumerIdsSet = new Set<string>(data.consumerIds);
                const existenceConsumerIdsSet = new Set<string>(existenceConsumerIds);

                const idsToCreate = data.consumerIds.filter(
                    (consumerId) => !existenceConsumerIdsSet.has(consumerId),
                );
                const idsToDelete = existenceConsumerIds.filter(
                    (existenceId) => !receivedConsumerIdsSet.has(existenceId),
                );

                const billConsumerCommands: Promise<ISelectBillConsumer[]>[] = [];

                if (isNotEmpty(idsToCreate)) {
                    billConsumerCommands.push(
                        this.commandBus.execute<
                            CreateManyBillsConsumersCommand,
                            ISelectBillConsumer[]
                        >(
                            new CreateManyBillsConsumersCommand({
                                billsConsumers: idsToCreate.map((id) => ({
                                    billId: data.id,
                                    consumerId: id,
                                    createdAt: getCurrentUTCTimestamp(),
                                })),
                            }),
                        ),
                    );
                }

                if (isNotEmpty(idsToDelete)) {
                    billConsumerCommands.push(
                        this.commandBus.execute<
                            DeleteManyBillsConsumersCommand,
                            ISelectBillConsumer[]
                        >(
                            new DeleteManyBillsConsumersCommand({
                                billId: data.id,
                                ids: idsToDelete,
                            }),
                        ),
                    );
                }

                await Promise.all([
                    ...billConsumerCommands,
                    this.commandBus.execute<UpdateBillCommand, ISelectBill>(
                        new UpdateBillCommand({
                            id: data.id,
                            amount: data.amount,
                            description: data.description,
                            purchasedAt: data.purchasedAt,
                            updatedAt: getCurrentUTCTimestamp(),
                            userId,
                            receiverId: data.receiverId,
                            locationId: data.locationId,
                        }),
                    ),
                ]);
            }
        }

        {
            const bill = await this.findBillByUserIdAndIdOrThrowService.execute(userId, data.id);

            await this.commandBus.execute<
                CreateOutboxEventCommand<IBillOutboxEvent>,
                ISelectOutboxEvent
            >(
                new CreateOutboxEventCommand<IBillOutboxEvent>({
                    aggregateId: bill.id,
                    aggregateType: 'bills',
                    eventType: 'updated',
                    payload: bill,
                    createdAt: getCurrentUTCTimestamp(),
                }),
            );
        }

        return IdEntity.create(data.id);
    }
}
