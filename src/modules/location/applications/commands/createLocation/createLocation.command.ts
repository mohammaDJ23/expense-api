import { LocationAbstract } from '@/modules/location/domain/abstracts/location.abstract';

export class CreateLocationCommand extends LocationAbstract {
    public override readonly name: string;
    public override readonly createdAt: Date;
    public override readonly updatedAt: Date;

    constructor(data: Required<Pick<LocationAbstract, 'name' | 'createdAt' | 'updatedAt'>>) {
        super(data);

        this.name = data.name;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
}
