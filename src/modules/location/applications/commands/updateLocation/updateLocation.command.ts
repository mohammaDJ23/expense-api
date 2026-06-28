import { LocationAbstract } from '@/modules/location/domain/abstracts/location.abstract';

export class UpdateLocationCommand extends LocationAbstract {
    public override readonly id: string;
    public override readonly name: string;
    public override readonly userId: string;
    public override readonly updatedAt: string;

    constructor(data: Required<Omit<LocationAbstract, 'createdAt'>>) {
        super(data);

        this.id = data.id;
        this.name = data.name;
        this.userId = data.userId;
        this.updatedAt = data.updatedAt;
    }
}
