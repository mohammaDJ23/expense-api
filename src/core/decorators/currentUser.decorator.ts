import { createParamDecorator, type ExecutionContext } from '@nestjs/common';

import type { TSelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CurrentUser = createParamDecorator((_: never, ctx: ExecutionContext): TSelectUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as TSelectUser;
});
