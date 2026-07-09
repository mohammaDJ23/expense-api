import { createOutboxRoute } from '@/modules/outbox/domain/utils/createOutboxRoute.util';

import type { IInsertOutboxEvent } from '@/modules/outbox/infrastructure/schemas/outboxEvent.schema';

export class CreateOutboxEventCommand<T extends IInsertOutboxEvent = IInsertOutboxEvent> {
    public readonly props: T;

    constructor(props: Omit<T, 'id' | 'route'>) {
        this.props = {
            ...props,
            route: createOutboxRoute(props.aggregateType, props.eventType),
        } as T;
    }
}
