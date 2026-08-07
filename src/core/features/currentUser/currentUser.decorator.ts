import { createParamDecorator, type ExecutionContext } from '@nestjs/common';

import { CurrentUserPipe } from './currentUser.pipe';

import type { ICurrentUser } from './currentUser.type';
import type { IRequest } from '@/core/types/request.type';

// eslint-disable-next-line @typescript-eslint/naming-convention
const BaseCurrentUser = createParamDecorator(
    (_: never, ctx: ExecutionContext): ICurrentUser | undefined => {
        const request = ctx.switchToHttp().getRequest<IRequest>();

        return request.user;
    },
);

// eslint-disable-next-line @typescript-eslint/naming-convention
export function CurrentUser(): ParameterDecorator {
    return BaseCurrentUser(CurrentUserPipe);
}
