import type { IBill } from '@/modules/bill/domain/types/bill.type';
import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';
import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

export interface ISearch {
    bills: IBill[];
    locations: ISelectLocation[];
    receivers: ISelectReceiver[];
    consumers: ISelectConsumer[];
}
