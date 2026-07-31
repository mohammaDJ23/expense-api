import type { ITotal } from '@/core/types/total.type';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

export interface IMostUsedReceiver extends ISelectReceiver, ITotal {}
