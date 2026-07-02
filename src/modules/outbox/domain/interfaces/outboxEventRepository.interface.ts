import type { ICreateRepository } from '@/core/interfaces/repositories/createRepository.interface';
import type { IDeleteManyByDateRepository } from '@/core/interfaces/repositories/deleteManyByDateRepository.interface';
import type {
    IInsertOutboxEvent,
    ISelectOutboxEvent,
} from '@/modules/outbox/infrastructure/schemas/outboxEvent.schema';

export interface IOutboxEventRepository
    extends
        ICreateRepository<IInsertOutboxEvent, ISelectOutboxEvent>,
        IDeleteManyByDateRepository<ISelectOutboxEvent> {}
