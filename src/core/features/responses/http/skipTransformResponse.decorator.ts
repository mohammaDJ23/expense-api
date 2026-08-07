import { SetMetadata, type CustomDecorator } from '@nestjs/common';

import { SKIP_TRANSFORM_RESPONSE_METADATA_KEY } from './httpResponse.constants';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function SkipTransformResponse(): CustomDecorator {
    return SetMetadata(SKIP_TRANSFORM_RESPONSE_METADATA_KEY, true);
}
