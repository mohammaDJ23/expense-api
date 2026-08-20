import type { TOutboxEventRoute } from '@/modules/outbox/domain/types/outboxEventRoute.type';

export const OUTBOX_EVENT_ROUTES: TOutboxEventRoute[] = [
    'bill.created',
    'bill.deleted',
    'bill.updated',
    'consumer.created',
    'consumer.deleted',
    'consumer.updated',
    'location.created',
    'location.deleted',
    'location.updated',
    'receiver.created',
    'receiver.deleted',
    'receiver.updated',
    'user.created',
    'user.deleted',
    'user.updated',
];
