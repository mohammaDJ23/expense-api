import type { IBill } from '@/modules/bill/domain/types/bill.type';

export const BILL_EXPORT_KEYS = [
    'id',
    'amount',
    'purchasedAt',
    'description',
    'createdAt',
    'updatedAt',
    'location',
    'receiver',
    'consumers',
] as const satisfies readonly (keyof IBill)[];

export const BILLS_SHEET_NAME = 'bills';
