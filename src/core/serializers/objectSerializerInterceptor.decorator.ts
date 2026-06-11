import { UseInterceptors } from '@nestjs/common';

import { ObjectSerializerInterceptor as SerializeObjectInterceptorClass } from './objectSerializer.interceptor';

import type { TClassConstructor } from '@/common/common.types';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function ObjectSerializerInterceptor(
    dto: TClassConstructor,
): ReturnType<typeof UseInterceptors> {
    return UseInterceptors(new SerializeObjectInterceptorClass(dto));
}
