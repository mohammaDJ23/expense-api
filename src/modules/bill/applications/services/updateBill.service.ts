import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Transactional } from '@nestjs-cls/transactional';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { isEmpty } from '@/common/utils/isEmpty.util';
import { IdEntity } from '@/core/entities/id.entity';
import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { UpdateBillCommand } from '@/modules/bill/applications/commands/updateBill/updateBill.command';
import { IsBillExistsByUserIdAndIdQuery } from '@/modules/bill/applications/queries/isBillExistsByUserIdAndId/isBillExistsByUserIdAndId.query';
import { CreateManyBillsConsumersCommand } from '@/modules/consumer/applications/commands/createManyBillsConsumers/createManyBillsConsumers.command';
import { DeleteManyBillsConsumersCommand } from '@/modules/consumer/applications/commands/deleteManyBillsConsumers/deleteManyBillsConsumers.command';
import { FindManyBillsConsumersByRefIdQuery } from '@/modules/consumer/applications/queries/findManyBillsConsumersByRefId/findManyBillsConsumersByRefId.query';
import { IsUserConsumerExistsByRefIdAndTargetIdsQuery } from '@/modules/consumer/applications/queries/isUserConsumerExistsByRefIdAndTargetIds/isUserConsumerExistsByRefIdAndTargetIds.query';
import { IsUserLocationExistsByRefIdAndTargetIdQuery } from '@/modules/location/applications/queries/isUserLocationExistsByRefIdAndTargetId/isUserLocationExistsByRefIdAndTargetId.query';
import { IsUserReceiverExistsByRefIdAndTargetIdQuery } from '@/modules/receiver/applications/queries/isUserReceiverExistsByRefIdAndTargetId/isUserReceiverExistsByRefIdAndTargetId.query';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';
import type { UpdateBillRequestDto } from '@/modules/bill/interface/dtos/updateBill.request.dto';
import type { ISelectBillConsumer } from '@/modules/consumer/infrastructure/schemas/billConsumer.schema';

@Injectable()
export class UpdateBillService implements IServiceHandler {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
    ) {}

    @Transactional()
    async execute(data: UpdateBillRequestDto, userId: string): Promise<IdEntity> {
        {
            const isExists = await this.queryBus.execute<IsBillExistsByUserIdAndIdQuery, boolean>(
                new IsBillExistsByUserIdAndIdQuery(userId, data.id),
            );

            if (!isExists) {
                throw new BadRequestException();
            }
        }

        {
            const [isUserReceiverExists, isUserLocationExists, isUserConsumerExists] =
                await Promise.all([
                    this.queryBus.execute<IsUserReceiverExistsByRefIdAndTargetIdQuery, boolean>(
                        new IsUserReceiverExistsByRefIdAndTargetIdQuery(userId, data.receiverId),
                    ),
                    this.queryBus.execute<IsUserLocationExistsByRefIdAndTargetIdQuery, boolean>(
                        new IsUserLocationExistsByRefIdAndTargetIdQuery(userId, data.locationId),
                    ),
                    this.queryBus.execute<IsUserConsumerExistsByRefIdAndTargetIdsQuery, boolean>(
                        new IsUserConsumerExistsByRefIdAndTargetIdsQuery(userId, data.consumerIds),
                    ),
                ]);

            if (!isUserReceiverExists || !isUserLocationExists || !isUserConsumerExists) {
                throw new BadRequestException();
            }
        }

        {
            const billsConsumers = await this.queryBus.execute<
                FindManyBillsConsumersByRefIdQuery,
                ISelectBillConsumer[]
            >(new FindManyBillsConsumersByRefIdQuery(data.id));

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

                if (idsToCreate.length > 0) {
                    billConsumerCommands.push(
                        this.commandBus.execute<
                            CreateManyBillsConsumersCommand,
                            ISelectBillConsumer[]
                        >(
                            new CreateManyBillsConsumersCommand(
                                idsToCreate.map((id) => ({
                                    billId: data.id,
                                    consumerId: id,
                                    createdAt: getCurrentUTCTimestamp(),
                                })),
                            ),
                        ),
                    );
                }

                if (idsToDelete.length > 0) {
                    billConsumerCommands.push(
                        this.commandBus.execute<
                            DeleteManyBillsConsumersCommand,
                            ISelectBillConsumer[]
                        >(new DeleteManyBillsConsumersCommand(data.id, idsToDelete)),
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

                return IdEntity.create(data.id);
            }
        }
    }
}
