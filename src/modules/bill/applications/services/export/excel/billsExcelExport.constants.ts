import type { IBill } from '@/modules/bill/domain/types/bill.type';

export const BILL_SHEET_KEYS = [
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

export const USER_SHEET_KEYS = ['userId', 'email', 'generatedAt'] as const;

export const USER_SHEET_NAME = 'user';
