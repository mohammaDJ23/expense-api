import { createOutboxRoute } from '@/modules/outbox/domain/utils/createOutboxRoute.util';

import type { TOutboxEventPayload } from '@/modules/outbox/domain/types/outboxEventPayload.type';
import type { IInsertOutboxEvent } from '@/modules/outbox/infrastructure/schemas/outboxEvent.schema';

export class CreateOutboxEventCommand<T = TOutboxEventPayload> {
    public readonly props: IInsertOutboxEvent<T>;

    constructor(props: Omit<IInsertOutboxEvent<T>, 'id' | 'route'>) {
        this.props = {
            ...props,
            route: createOutboxRoute(props.aggregateType, props.eventType),
        };
    }
}
