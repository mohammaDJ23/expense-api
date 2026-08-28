import { createParamDecorator, type ExecutionContext } from '@nestjs/common';

import { OauthCurrentUserPipe } from './oauthCurrentUser.pipe';

import type { IOauthCurrentUser } from './oauthCurrentUser.type';
import type { IRequest } from '@/core/types/request.type';

// eslint-disable-next-line @typescript-eslint/naming-convention
const BaseOauthCurrentUser = createParamDecorator(
    (_: never, ctx: ExecutionContext): IOauthCurrentUser | undefined => {
        const request = ctx.switchToHttp().getRequest<IRequest>();

        return request.user as IOauthCurrentUser | undefined;
    },
);

// eslint-disable-next-line @typescript-eslint/naming-convention
export function OauthCurrentUser(): ParameterDecorator {
    return BaseOauthCurrentUser(OauthCurrentUserPipe);
}
