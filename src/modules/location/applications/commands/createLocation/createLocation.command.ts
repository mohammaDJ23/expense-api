import type { IInsertLocation } from '@/modules/location/infrastructure/schemas/location.schema';

interface IProps extends Required<Omit<IInsertLocation, 'id'>> {}

export class CreateLocationCommand {
    constructor(public readonly props: IProps) {}
}
