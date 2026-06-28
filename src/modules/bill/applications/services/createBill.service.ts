import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Transactional } from '@nestjs-cls/transactional';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { IdEntity } from '@/core/entities/id.entity';
import { CreateBillCommand } from '@/modules/bill/applications/commands/createBill/createBill.command';
import { CreateManyBillsConsumersCommand } from '@/modules/consumer/applications/commands/createManyBillsConsumers/createManyBillsConsumers.command';
import { IsConsumerExistsByUserIdAndIdsQuery } from '@/modules/consumer/applications/queries/isConsumerExistsByUserIdAndIds/isConsumerExistsByUserIdAndIds.query';
import { IsLocationExistsByUserIdAndIdQuery } from '@/modules/location/applications/queries/isLocationExistsByUserIdAndId/isLocationExistsByUserIdAndId.query';
import { IsReceiverExistsByUserIdAndIdQuery } from '@/modules/receiver/applications/queries/isReceiverExistsByUserIdAndId/isReceiverExistsByUserIdAndId.query';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';
import type { CreateBillRequestDto } from '@/modules/bill/interface/dtos/createBill.request.dto';
import type { ISelectBillConsumer } from '@/modules/consumer/infrastructure/schemas/billConsumer.schema';

@Injectable()
export class CreateBillService implements IServiceHandler {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
    ) {}

    @Transactional()
    async execute(data: CreateBillRequestDto, userId: string): Promise<IdEntity> {
        {
            const [isUserReceiverExists, isUserLocationExists, isUsersConsumersExists] =
                await Promise.all([
                    this.queryBus.execute<IsReceiverExistsByUserIdAndIdQuery, boolean>(
                        new IsReceiverExistsByUserIdAndIdQuery(userId, data.receiverId),
                    ),
                    this.queryBus.execute<IsLocationExistsByUserIdAndIdQuery, boolean>(
                        new IsLocationExistsByUserIdAndIdQuery(userId, data.locationId),
                    ),
                    this.queryBus.execute<IsConsumerExistsByUserIdAndIdsQuery, boolean>(
                        new IsConsumerExistsByUserIdAndIdsQuery(userId, data.consumerIds),
                    ),
                ]);

            if (!isUserReceiverExists || !isUserLocationExists || !isUsersConsumersExists) {
                throw new BadRequestException();
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

            await this.commandBus.execute<CreateManyBillsConsumersCommand, ISelectBillConsumer[]>(
                new CreateManyBillsConsumersCommand(
                    data.consumerIds.map((consumerId) => ({
                        billId: createdBill.id,
                        consumerId,
                        createdAt: getCurrentUTCTimestamp(),
                    })),
                ),
            );

            return IdEntity.create(createdBill.id);
        }
    }
}
