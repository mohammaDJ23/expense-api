import type { IList } from '@/core/interfaces/list.interface';
import type { ICreateRepository } from '@/core/interfaces/repositories/createRepository.interface';
import type { IDeleteByUserIdAndIdRepository } from '@/core/interfaces/repositories/deleteByUserIdAndIdRepository.interface';
import type { IExistsByUserIdAndIdRepository } from '@/core/interfaces/repositories/existsByUserIdAndIdRepository.interface';
import type { IFindByUserIdAndIdOrThrowRepository } from '@/core/interfaces/repositories/findByUserIdAndIdOrThrowRepository.interface';
import type { IFindListByUserIdRepository } from '@/core/interfaces/repositories/findListByUserIdRepository.interface';
import type { IUpdateRepository } from '@/core/interfaces/repositories/updateRepository.interface';
import type { IInsertBill, ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';

export interface IBillRepository
    extends
        ICreateRepository<IInsertBill, ISelectBill>,
        IDeleteByUserIdAndIdRepository<ISelectBill>,
        IFindListByUserIdRepository<IList, ISelectBill>,
        IFindByUserIdAndIdOrThrowRepository<ISelectBill>,
        IUpdateRepository<
            Partial<ISelectBill> & Required<Pick<ISelectBill, 'id' | 'userId'>>,
            ISelectBill
        >,
        IExistsByUserIdAndIdRepository {}
