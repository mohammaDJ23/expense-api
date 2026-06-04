import { UseInterceptors } from '@nestjs/common';

import { SerializeObjectInterceptor as CSerializeObjectInterceptor } from '@/core/interceptors/serializeObject.interceptor';

import type { TClassConstructor } from '@/common/types';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function SerializeObjectInterceptor(
    dto: TClassConstructor,
): ReturnType<typeof UseInterceptors> {
    return UseInterceptors(new CSerializeObjectInterceptor(dto));
}
