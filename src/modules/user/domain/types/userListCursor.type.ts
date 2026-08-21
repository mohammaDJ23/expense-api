import type { TCursor } from '@/core/features/pagination/cursor/cursor.type';

export interface IUserListCursor extends TCursor<{ createdAt: string }> {}
