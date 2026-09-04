import { AuthenticationMessageEvent } from '@/modules/authentication/domain/enums/authenticationMessageEvent.enum';
import { BillMessageEvent } from '@/modules/bill/domain/enums/billMessageEvent.enum';
import { ConsumerMessageEvent } from '@/modules/consumer/domain/enums/consumerMessageEvent.enum';
import { LocationMessageEvent } from '@/modules/location/domain/enums/locationMessageEvent.enum';
import { ReceiverMessageEvent } from '@/modules/receiver/domain/enums/receiverMessageEvent.enum';
import { UserMessageEvent } from '@/modules/user/domain/enums/userMessageEvent.enum';

import type { TOutboxEventType } from '@/modules/outbox/domain/types/outboxEventType.type';

export const OUTBOX_EVENTS: TOutboxEventType[] = Object.values({
    ...AuthenticationMessageEvent,
    ...BillMessageEvent,
    ...ConsumerMessageEvent,
    ...LocationMessageEvent,
    ...ReceiverMessageEvent,
    ...UserMessageEvent,
});
