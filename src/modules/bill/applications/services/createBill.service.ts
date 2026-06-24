import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Transactional } from '@nestjs-cls/transactional';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { IdEntity } from '@/core/entities/id.entity';
import { CreateBillCommand } from '@/modules/bill/applications/commands/createBill/createBill.command';
import { CreateManyBillsConsumersCommand } from '@/modules/consumer/applications/commands/createManyBillsConsumers/createManyBillsConsumers.command';
import { IsConsumerExistsByIdsQuery } from '@/modules/consumer/applications/queries/isConsumerExistsByIds/isConsumerExistsByIds.query';
import { IsLocationExistsByIdQuery } from '@/modules/location/applications/queries/isLocationExistsById/isLocationExistsById.query';
import { IsReceiverExistsByIdQuery } from '@/modules/receiver/applications/queries/isReceiverExistsById/isReceiverExistsById.query';

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
        const [isReceiverExists, isLocationExists, isConsumersExists] = await Promise.all([
            this.queryBus.execute<IsReceiverExistsByIdQuery, boolean>(
                new IsReceiverExistsByIdQuery(data.receiverId),
            ),
            this.queryBus.execute<IsLocationExistsByIdQuery, boolean>(
                new IsLocationExistsByIdQuery(data.locationId),
            ),
            this.queryBus.execute<IsConsumerExistsByIdsQuery, boolean>(
                new IsConsumerExistsByIdsQuery(data.consumerIds),
            ),
        ]);

        if (!isReceiverExists) {
            throw new BadRequestException('Receiver is not exists');
        }

        if (!isLocationExists) {
            throw new BadRequestException('Location is not exists');
        }

        if (!isConsumersExists) {
            throw new BadRequestException('Consumer is not exists');
        }

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
