import type { TCursor } from '@/core/features/pagination/cursor/cursor.type';

export interface ILocationListCursor extends TCursor<{ createdAt: string }> {}
