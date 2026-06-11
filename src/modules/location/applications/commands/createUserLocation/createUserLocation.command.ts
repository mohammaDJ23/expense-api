import { UserLocationAbstract } from '@/modules/location/domain/abstracts/userLocation.abstract';

export class CreateUserLocationCommand extends UserLocationAbstract {
    public readonly userId: string;
    public readonly locationId: string;
    public readonly createdAt: Date;

    constructor(data: Required<Pick<UserLocationAbstract, 'userId' | 'locationId' | 'createdAt'>>) {
        super(data);

        this.userId = data.userId;
        this.locationId = data.locationId;
        this.createdAt = data.createdAt;
    }
}
