import type { BillResource } from '@/modules/bill/domain/enums/bill.enum';
import type { ConsumerResource } from '@/modules/consumer/domain/enums/consumer.enum';
import type { LocationResource } from '@/modules/location/domain/enums/location.enum';
import type { ReceiverResource } from '@/modules/receiver/domain/enums/receiver.enum';
import type { UserResource } from '@/modules/user/domain/enums/user.enum';

export type TQueryCacheNamespace =
    BillResource | ConsumerResource | LocationResource | ReceiverResource | UserResource;
