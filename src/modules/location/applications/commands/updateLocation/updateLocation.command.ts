import type { IInsertLocation } from '@/modules/location/infrastructure/schemas/location.schema';

interface IProps extends Required<Omit<IInsertLocation, 'createdAt'>> {}

export class UpdateLocationCommand {
    constructor(public readonly props: IProps) {}
}
