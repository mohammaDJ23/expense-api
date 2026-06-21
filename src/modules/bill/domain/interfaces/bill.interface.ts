import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';
import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';
import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

export interface IBill extends ISelectBill {
    location: ISelectLocation;
    receiver: ISelectReceiver;
    consumers: ISelectConsumer[];
}
