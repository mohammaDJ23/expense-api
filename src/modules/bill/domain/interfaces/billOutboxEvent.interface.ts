import type { IBill } from './bill.interface';
import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';
import type { IInsertOutboxEvent } from '@/modules/outbox/infrastructure/schemas/outboxEvent.schema';

type TBillEventType = 'created' | 'updated' | 'deleted';

export interface IBillOutboxEvent extends Omit<
    IInsertOutboxEvent<IBill | ISelectBill>,
    'aggregateType' | 'eventType'
> {
    aggregateType: 'bills';
    eventType: TBillEventType;
}
