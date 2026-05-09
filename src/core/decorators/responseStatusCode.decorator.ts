import { SetMetadata, type CustomDecorator, type HttpStatus } from '@nestjs/common';

import { RESPONSE_STATUS_METADATA_KEY } from '@/core/constants/responseMetadata.constant';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function ResponseStatusCode(statusCode: HttpStatus): CustomDecorator {
    return SetMetadata(RESPONSE_STATUS_METADATA_KEY, statusCode);
}
