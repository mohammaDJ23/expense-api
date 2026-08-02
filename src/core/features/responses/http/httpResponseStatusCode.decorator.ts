import { SetMetadata, type CustomDecorator, type HttpStatus } from '@nestjs/common';

import { HTTP_RESPONSE_STATUS_METADATA_KEY } from './httpResponse.constants';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function HttpResponseStatusCode(statusCode: HttpStatus): CustomDecorator {
    return SetMetadata(HTTP_RESPONSE_STATUS_METADATA_KEY, statusCode);
}
