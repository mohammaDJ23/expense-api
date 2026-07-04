import {
    createParamDecorator,
    InternalServerErrorException,
    type ExecutionContext,
} from '@nestjs/common';

import type { ICurrentUser } from '@/core/authentication/currentUser.interface';
import type { IRequest } from '@/core/interfaces/request.interface';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CurrentUser = createParamDecorator((_: never, ctx: ExecutionContext): ICurrentUser => {
    const request = ctx.switchToHttp().getRequest<IRequest>();
    const user = request.user;

    if (!user) {
        throw new InternalServerErrorException('Current user is not found');
    }

    return user;
});
