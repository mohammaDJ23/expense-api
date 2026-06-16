import { Injectable } from '@nestjs/common';

import { CreateUserReceiverService } from '@/modules/receiver/applications/services/createUserReceiver.service';
import { GetUserReceiverByIdOrNullService } from '@/modules/receiver/applications/services/getUserReceiverByIdOrNull.service';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';

@Injectable()
export class CreateUserReceiverIfNotExistsService implements IServiceHandler {
    constructor(
        private readonly createUserReceiverService: CreateUserReceiverService,
        private readonly getUserReceiverByIdOrNullService: GetUserReceiverByIdOrNullService,
    ) {}

    async execute(userId: string, receiverId: string): Promise<void> {
        const userReceiver = await this.getUserReceiverByIdOrNullService.execute(
            userId,
            receiverId,
        );
        if (!userReceiver) {
            await this.createUserReceiverService.execute(userId, receiverId);
        }
    }
}
