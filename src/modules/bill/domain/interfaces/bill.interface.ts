import type { TSelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';
import type { TSelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';
import type { TSelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';
import type { TSelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

export interface IBill extends TSelectBill {
    location: TSelectLocation;
    receiver: TSelectReceiver;
    consumers: TSelectConsumer[];
}
