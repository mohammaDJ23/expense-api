import type { TCursor } from '@/core/features/pagination/cursor/cursor.type';

export interface IReceiverListCursor extends TCursor<{ createdAt: string }> {}
