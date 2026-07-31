import { NotFoundException } from '@nestjs/common';
import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { omitUndefined } from '@/core/utils/omitUndefined.util';
import { ConsumerRepository } from '@/modules/consumer/infrastructure/repositories/consumer.repository';

import { UpdateConsumerCommand } from './updateConsumer.command';

import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';

@CommandHandler(UpdateConsumerCommand)
export class UpdateConsumerHandler implements ICommandHandler<
    UpdateConsumerCommand,
    ISelectConsumer
> {
    constructor(private readonly consumerRepository: ConsumerRepository) {}

    async execute(command: UpdateConsumerCommand): Promise<ISelectConsumer> {
        try {
            return await this.consumerRepository.update(omitUndefined(command.props));
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
