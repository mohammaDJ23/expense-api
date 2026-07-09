import type { IBill } from './bill.interface';
import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';
import type { IInsertOutboxEvent } from '@/modules/outbox/infrastructure/schemas/outboxEvent.schema';

export interface IBillOutboxEvent extends IInsertOutboxEvent<IBill | ISelectBill> {}
