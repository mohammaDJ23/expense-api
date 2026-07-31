import type { ITotal } from '@/core/interfaces/total.interface';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

export interface IMostUsedReceiver extends ISelectReceiver, ITotal {}
