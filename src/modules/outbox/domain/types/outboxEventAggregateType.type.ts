import type { BillResource } from '@/modules/bill/bill.enum';
import type { ConsumerResource } from '@/modules/consumer/consumer.enum';
import type { LocationResource } from '@/modules/location/location.enum';
import type { ReceiverResource } from '@/modules/receiver/receiver.enum';
import type { UserResource } from '@/modules/user/user.enum';

export type TOutboxEventAggregateType =
    BillResource | ConsumerResource | LocationResource | ReceiverResource | UserResource;
