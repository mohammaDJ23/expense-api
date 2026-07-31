import type { ITotal } from '@/core/interfaces/total.interface';
import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';

export interface IMostUsedLocation extends ISelectLocation, ITotal {}
