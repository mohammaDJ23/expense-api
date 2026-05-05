import { SetMetadata, type CustomDecorator } from '@nestjs/common';

import { RESPONSE_MESSAGE_METADATA_KEY } from '@/common/infrastructure/core/constants/responseMetadata.constant';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function ResponseMessage(message: string): CustomDecorator {
    return SetMetadata(RESPONSE_MESSAGE_METADATA_KEY, message);
}
