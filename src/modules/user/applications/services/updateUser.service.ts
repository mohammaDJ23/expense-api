import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { IdEntity } from '@/core/entities/id.entity';
import { UpdateUserCommand } from '@/modules/user/applications/commands/updateUser/updateUser.command';
import { UserExistenceValidatorService } from '@/modules/user/applications/services/validators/userExistenceValidator.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';
import type { UpdateUserRequestDto } from '@/modules/user/interfaces/dtos/updateUser.request.dto';

interface IInput {
    userId: string;
    body: UpdateUserRequestDto;
}

@Injectable()
export class UpdateUserService implements IService<IInput, IdEntity> {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly userExistenceValidatorService: UserExistenceValidatorService,
    ) {}

    async execute(input: IInput): Promise<IdEntity> {
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

        return IdEntity.create(updatedUser.id);
    }
}
