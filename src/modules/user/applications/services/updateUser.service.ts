import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { getCurrentUTCTimestamp } from '@/core/utils/getCurrentUTCTimestamp.util';
import { UpdateUserCommand } from '@/modules/user/applications/commands/updateUser/updateUser.command';
import { UserExistenceValidatorService } from '@/modules/user/applications/services/validators/userExistenceValidator.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { IId } from '@/core/types/id.interface';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';
import type { UpdateUserRequestDto } from '@/modules/user/interfaces/dtos/updateUser.request.dto';

interface IInput {
    userId: string;
    body: UpdateUserRequestDto;
}

@Injectable()
export class UpdateUserService implements IService<IInput, IId> {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly userExistenceValidatorService: UserExistenceValidatorService,
    ) {}

    async execute(input: IInput): Promise<IId> {
        await this.userExistenceValidatorService.validate({ userId: input.userId });

        const updatedUser = await this.commandBus.execute<UpdateUserCommand, ISelectUser>(
            new UpdateUserCommand({
                id: input.userId,
                firstName: input.body.firstName,
                lastName: input.body.lastName,
                phone: input.body.phone,
                updatedAt: getCurrentUTCTimestamp(),
            }),
        );

        return {
            id: updatedUser.id,
        };
    }
}
