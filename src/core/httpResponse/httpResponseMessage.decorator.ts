import { SetMetadata, type CustomDecorator } from '@nestjs/common';

import { HTTP_RESPONSE_MESSAGE_METADATA_KEY } from './httpResponse.constants';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function HttpResponseMessage(message: string): CustomDecorator {
    return SetMetadata(HTTP_RESPONSE_MESSAGE_METADATA_KEY, message);
}
