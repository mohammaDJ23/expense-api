import type { ICreateRepository } from '@/core/interfaces/repositories/createRepository.interface';
import type { IDeleteByUserIdAndIdRepository } from '@/core/interfaces/repositories/deleteByUserIdAndIdRepository.interface';
import type { IExistsByUserIdAndIdRepository } from '@/core/interfaces/repositories/existsByUserIdAndIdRepository.interface';
import type { IFindByUserIdAndIdOrThrowRepository } from '@/core/interfaces/repositories/findByUserIdAndIdOrThrowRepository.interface';
import type { IFindListByUserIdRepository } from '@/core/interfaces/repositories/findListByUserIdRepository.interface';
import type { IFindManyByUserIdAndIdsRepository } from '@/core/interfaces/repositories/findManyByUserIdAndIdsRepository.interface';
import type { IFindManyByUserIdRepository } from '@/core/interfaces/repositories/findManyByUserIdRepository.interface';
import type { IFindTotalByUserIdRepository } from '@/core/interfaces/repositories/findTotalByUserIdRepository.interface';
import type { IUpdateRepository } from '@/core/interfaces/repositories/updateRepository.interface';
import type { IListQuery } from '@/core/types/listQuery.type';
import type { IBillPeriod } from '@/modules/bill/domain/types/billPeriod.type';
import type { IBillTimeline } from '@/modules/bill/domain/types/billTimeline.type';
import type { IMostUsed } from '@/modules/bill/domain/types/mostUsed.type';
import type { IInsertBill, ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';

export interface IBillRepository
    extends
        ICreateRepository<IInsertBill, ISelectBill>,
        IDeleteByUserIdAndIdRepository<ISelectBill>,
        IFindListByUserIdRepository<IListQuery, ISelectBill>,
        IFindByUserIdAndIdOrThrowRepository<ISelectBill>,
        IUpdateRepository<
            Partial<ISelectBill> & Required<Pick<ISelectBill, 'id' | 'userId'>>,
            ISelectBill
        >,
        IExistsByUserIdAndIdRepository,
        IFindManyByUserIdAndIdsRepository<ISelectBill>,
        IFindTotalByUserIdRepository,
        IFindManyByUserIdRepository<ISelectBill> {
    findMostUsedLocations(userId: string, limit: number): Promise<IMostUsed[]>;
    findMostUsedReceivers(userId: string, limit: number): Promise<IMostUsed[]>;
    findMostUsedConsumers(userId: string, limit: number): Promise<IMostUsed[]>;
    findPeriodByPurchasedAt(userId: string): Promise<IBillPeriod>;
    findTimelineByPurchasedAt(
        userId: string,
        start: string,
        end: string,
        clientTimezone: string,
    ): Promise<IBillTimeline[]>;
}
