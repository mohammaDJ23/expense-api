import type { TCursor } from '@/core/features/pagination/cursor/cursor.type';

export interface IBillListCursor extends TCursor<{ createdAt: string }> {}
