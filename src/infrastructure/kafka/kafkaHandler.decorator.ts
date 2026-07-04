import { applyDecorators, Injectable, SetMetadata } from '@nestjs/common';

import { KAFKA_HANDLER_METADATA } from './kafka.constants';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function KafkaHandler(): ReturnType<typeof applyDecorators> {
    return applyDecorators(SetMetadata(KAFKA_HANDLER_METADATA, true), Injectable());
}
