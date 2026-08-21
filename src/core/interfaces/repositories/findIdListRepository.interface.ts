import type { IId } from '@/core/types/id.type';

export interface IFindIdListRepository<TCursor> {
    findIdList(limit: number, cursor: TCursor | null): Promise<IId[]>;
}
