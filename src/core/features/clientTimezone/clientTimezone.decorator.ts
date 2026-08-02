import { createParamDecorator, type ExecutionContext } from '@nestjs/common';

import { ClientTimezonePipe } from './clientTimezone.pipe';

import type { IRequest } from '@/core/types/request.type';

// eslint-disable-next-line @typescript-eslint/naming-convention
const BaseClientTimezone = createParamDecorator(
    (_: unknown, ctx: ExecutionContext): string | undefined => {
        const request = ctx.switchToHttp().getRequest<IRequest>();

        return request.clientTimezone;
    },
);

// eslint-disable-next-line @typescript-eslint/naming-convention
export function ClientTimezone(): ParameterDecorator {
    return BaseClientTimezone(ClientTimezonePipe);
}
