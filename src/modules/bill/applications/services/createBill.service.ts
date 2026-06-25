import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Transactional } from '@nestjs-cls/transactional';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { IdEntity } from '@/core/entities/id.entity';
import { CreateBillCommand } from '@/modules/bill/applications/commands/createBill/createBill.command';
import { CreateManyBillsConsumersCommand } from '@/modules/consumer/applications/commands/createManyBillsConsumers/createManyBillsConsumers.command';
import { IsUserConsumerExistsByRefIdAndTargetIdsQuery } from '@/modules/consumer/applications/queries/isUserConsumerExistsByRefIdAndTargetIds/isUserConsumerExistsByRefIdAndTargetIds.query';
import { IsUserLocationExistsByRefIdAndTargetIdQuery } from '@/modules/location/applications/queries/isUserLocationExistsByRefIdAndTargetId/isUserLocationExistsByRefIdAndTargetId.query';
import { IsUserReceiverExistsByRefIdAndTargetIdQuery } from '@/modules/receiver/applications/queries/isUserReceiverExistsByRefIdAndTargetId/isUserReceiverExistsByRefIdAndTargetId.query';

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
