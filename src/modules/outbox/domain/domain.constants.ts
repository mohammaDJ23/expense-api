import type { TOutboxEventRoute } from '@/modules/outbox/domain/interfaces/outboxEventRoute.interface';

export const OUTBOX_EVENT_ROUTES: TOutboxEventRoute[] = [
    'bills.created',
    'bills.deleted',
    'bills.updated',
    'consumers.created',
    'consumers.deleted',
    'consumers.updated',
    'locations.created',
    'locations.deleted',
    'locations.updated',
    'receivers.created',
    'receivers.deleted',
    'receivers.updated',
];
