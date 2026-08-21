import type { TCursor } from '@/core/features/pagination/cursor/cursor.type';

export interface IConsumerListCursor extends TCursor<{ createdAt: string }> {}
