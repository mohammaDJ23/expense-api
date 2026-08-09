import type { ICursor } from '@/core/utils/cursor/cursor.type';

export interface IFindListRepository<TOutput> {
    findList(limit: number, cursor: ICursor | null): Promise<TOutput[]>;
}
