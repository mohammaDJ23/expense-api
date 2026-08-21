import type { IId } from '@/core/types/id.type';

export interface IFindIdListRepository {
    findIdList(limit: number, cursor: string | null): Promise<IId[]>;
}
