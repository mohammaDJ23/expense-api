import type { AuthenticationMessageEvent } from '@/modules/authentication/domain/enums/authenticationMessageEvent.enum';
import type { BillMessageEvent } from '@/modules/bill/domain/enums/billMessageEvent.enum';
import type { ConsumerMessageEvent } from '@/modules/consumer/domain/enums/consumerMessageEvent.enum';
import type { LocationMessageEvent } from '@/modules/location/domain/enums/locationMessageEvent.enum';
import type { ReceiverMessageEvent } from '@/modules/receiver/domain/enums/receiverMessageEvent.enum';
import type { UserMessageEvent } from '@/modules/user/domain/enums/userMessageEvent.enum';

export type TOutboxEventType =
    | AuthenticationMessageEvent
    | BillMessageEvent
    | ConsumerMessageEvent
    | LocationMessageEvent
    | ReceiverMessageEvent
    | UserMessageEvent;
