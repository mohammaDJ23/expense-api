import { SetMetadata, type CustomDecorator } from '@nestjs/common';

import { CACHEABLE_METADATA_KEY } from './cache.constants';
import { cacheableNormalizer } from './cacheableNormalizer.util';

import type { ICacheable } from './cacheable.type';
import type { TQuery } from './query.type';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function Cacheable<T = TQuery>(options: ICacheable<T>): CustomDecorator {
    return SetMetadata(CACHEABLE_METADATA_KEY, cacheableNormalizer<T>(options));
}
