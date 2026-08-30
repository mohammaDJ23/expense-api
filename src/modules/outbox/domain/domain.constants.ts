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
    'local_signup.created',
    'local_reset_password.created',
    'local_send_verification.created',
];
