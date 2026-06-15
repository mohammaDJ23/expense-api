import { UseInterceptors } from '@nestjs/common';

import { SerializerInterceptor as SerializerInterceptorClass } from './serializer.interceptor';

import type { TClassConstructor } from '@/common/common.types';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function SerializerInterceptor(dto: TClassConstructor): ReturnType<typeof UseInterceptors> {
    return UseInterceptors(new SerializerInterceptorClass(dto));
}
