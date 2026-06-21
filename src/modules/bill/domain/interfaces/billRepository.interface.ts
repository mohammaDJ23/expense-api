import type { IList } from '@/core/interfaces/list.interface';
import type { ICreateRepository } from '@/core/interfaces/repositories/createRepository.interface';
import type { IFindByUserIdAndIdOrThrowRepository } from '@/core/interfaces/repositories/findByUserIdAndIdOrThrowRepository.interface';
import type { IFindListByUserIdRepository } from '@/core/interfaces/repositories/findListByUserIdRepository.interface';
import type { IInsertBill, ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';

export interface IBillRepository
    extends
        ICreateRepository<IInsertBill, ISelectBill>,
        IFindListByUserIdRepository<IList, ISelectBill>,
        IFindByUserIdAndIdOrThrowRepository<ISelectBill> {}
