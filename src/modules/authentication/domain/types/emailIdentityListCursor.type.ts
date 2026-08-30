import type { TCursor } from '@/core/features/pagination/cursor/cursor.type';

export interface IEmailIdentityListCursor extends TCursor<{ createdAt: string }> {}
