import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';
import type { IInsertOutboxEvent } from '@/modules/outbox/infrastructure/schemas/outboxEvent.schema';

export interface ILocationOutboxEvent extends IInsertOutboxEvent<ISelectLocation> {}
