import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Transactional } from '@nestjs-cls/transactional';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { isEmpty } from '@/common/utils/isEmpty.util';
import { IdEntity } from '@/core/entities/id.entity';
import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { CreateBillCommand } from '@/modules/bill/applications/commands/createBill/createBill.command';
import { CreateManyBillsConsumersCommand } from '@/modules/consumer/applications/commands/createManyBillsConsumers/createManyBillsConsumers.command';
import { ConsumersExistenceValidatorService } from '@/modules/consumer/applications/services/validators/consumersExistenceValidator.service';
import { LocationExistenceValidatorService } from '@/modules/location/applications/services/validators/locationExistenceValidator.service';
import { CreateOutboxEventCommand } from '@/modules/outbox/applications/commands/createOutboxEvent/createOutboxEvent.command';
import { ReceiverExistenceValidatorService } from '@/modules/receiver/applications/services/validators/receiverExistenceValidator.service';

import { FindBillByUserIdAndIdOrThrowService } from './findBillByUserIdAndIdOrThrow.service';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { IBillOutboxEvent } from '@/modules/bill/domain/interfaces/billOutboxEvent.interface';
import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';
import type { CreateBillRequestDto } from '@/modules/bill/interface/dtos/createBill.request.dto';
import type { ISelectBillConsumer } from '@/modules/consumer/infrastructure/schemas/billConsumer.schema';
import type { ISelectOutboxEvent } from '@/modules/outbox/infrastructure/schemas/outboxEvent.schema';

@Injectable()
export class CreateBillService implements IServiceHandler {
    // eslint-disable-next-line max-params
    constructor(
        private readonly commandBus: CommandBus,
        private readonly findBillByUserIdAndIdOrThrowService: FindBillByUserIdAndIdOrThrowService,
        private readonly consumersExistenceValidatorService: ConsumersExistenceValidatorService,
        private readonly locationExistenceValidatorService: LocationExistenceValidatorService,
        private readonly receiverExistenceValidatorService: ReceiverExistenceValidatorService,
    ) {}

    @Transactional()
    async execute(data: CreateBillRequestDto, userId: string): Promise<IdEntity> {
        await Promise.all([
            this.receiverExistenceValidatorService.validate({ userId, id: data.receiverId }),
            this.locationExistenceValidatorService.validate({ userId, id: data.locationId }),
            this.consumersExistenceValidatorService.validate({ userId, ids: data.consumerIds }),
        ]);

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
