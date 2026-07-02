import { NotFoundException } from '@nestjs/common';
import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { ConsumerRepository } from '@/modules/consumer/infrastructure/repositories/consumer.repository';

import { DeleteConsumerCommand } from './deleteConsumer.command';

import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';

@CommandHandler(DeleteConsumerCommand)
export class DeleteConsumerHandler implements ICommandHandler<
    DeleteConsumerCommand,
    ISelectConsumer
> {
    constructor(private readonly consumerRepository: ConsumerRepository) {}

    async execute(command: DeleteConsumerCommand): Promise<ISelectConsumer> {
        try {
            return await this.consumerRepository.deleteByUserIdAndId(
                command.props.userId,
                command.props.id,
            );
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
