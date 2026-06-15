import type { TInsertBill, TSelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';

export interface IBillRepository {
    create(data: TInsertBill): Promise<TSelectBill>;
    getMany(userId: string, offset: number, limit: number): Promise<TSelectBill[]>;
}
