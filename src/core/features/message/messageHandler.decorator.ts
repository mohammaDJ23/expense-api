import { applyDecorators, Injectable, SetMetadata } from '@nestjs/common';

import { MESSAGE_HANDLER_METADATA } from './message.constants';

import type { TOutboxEventType } from '@/modules/outbox/domain/types/outboxEventType.type';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function MessageHandler(eventType: TOutboxEventType): ReturnType<typeof applyDecorators> {
    return applyDecorators(SetMetadata(MESSAGE_HANDLER_METADATA, eventType), Injectable());
}
