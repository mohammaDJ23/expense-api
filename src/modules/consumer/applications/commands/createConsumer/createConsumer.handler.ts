import { NotFoundException } from '@nestjs/common';
import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { ConsumerRepository } from '@/modules/consumer/infrastructure/repositories/consumer.repository';

import { CreateConsumerCommand } from './createConsumer.command';

import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';

@CommandHandler(CreateConsumerCommand)
export class CreateConsumerHandler implements ICommandHandler<
    CreateConsumerCommand,
    ISelectConsumer
> {
    constructor(private readonly consumerRepository: ConsumerRepository) {}

    async execute(command: CreateConsumerCommand): Promise<ISelectConsumer> {
        try {
            return await this.consumerRepository.create(command);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
