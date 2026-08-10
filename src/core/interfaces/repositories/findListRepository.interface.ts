import type { ICursor } from '@/core/utils/pagination/cursor.type';

export interface IFindListRepository<TOutput> {
    findList(limit: number, cursor: ICursor | null): Promise<TOutput[]>;
}
