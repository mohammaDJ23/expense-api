import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';
import type { IInsertOutboxEvent } from '@/modules/outbox/infrastructure/schemas/outboxEvent.schema';

type TLocationEventType = 'created' | 'updated' | 'deleted';

export interface ILocationOutboxEvent extends Omit<
    IInsertOutboxEvent<ISelectLocation>,
    'aggregateType' | 'eventType'
> {
    aggregateType: 'locations';
    eventType: TLocationEventType;
}
