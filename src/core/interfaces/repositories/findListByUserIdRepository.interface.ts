import type { ICursor } from '@/core/utils/cursor/cursor.type';

export interface IFindListByUserIdRepository<TOutput> {
    findListByUserId(userId: string, limit: number, cursor: ICursor | null): Promise<TOutput[]>;
}
