import { applyDecorators, Injectable, SetMetadata } from '@nestjs/common';

import { MESSAGE_HANDLER_METADATA } from './message.constants';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function MessageHandler(): ReturnType<typeof applyDecorators> {
    return applyDecorators(SetMetadata(MESSAGE_HANDLER_METADATA, true), Injectable());
}
