import type { ITotal } from '@/core/types/total.interface';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

export interface IMostUsedReceiver extends ISelectReceiver, ITotal {}
