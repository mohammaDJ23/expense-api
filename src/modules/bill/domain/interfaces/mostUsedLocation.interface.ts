import type { ITotal } from '@/core/types/total.interface';
import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';

export interface IMostUsedLocation extends ISelectLocation, ITotal {}
