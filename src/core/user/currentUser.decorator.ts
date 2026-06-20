import {
    createParamDecorator,
    InternalServerErrorException,
    type ExecutionContext,
} from '@nestjs/common';

import type { IRequest } from '@/core/interfaces/request.interface';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CurrentUser = createParamDecorator((_: never, ctx: ExecutionContext): ISelectUser => {
    const request = ctx.switchToHttp().getRequest<IRequest>();
    const user = request.user;

    if (!user) {
        throw new InternalServerErrorException('Could not found the user by request');
    }

    return user;
});
