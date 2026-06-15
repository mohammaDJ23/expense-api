import type { IUserLocationAbstract } from '@/modules/location/domain/interfaces/userLocationAbstract.interface';

export abstract class UserLocationAbstract implements Partial<IUserLocationAbstract> {
    public readonly id?: string;
    public readonly userId?: string;
    public readonly locationId?: string;
    public readonly createdAt?: string;

    constructor(data: Partial<IUserLocationAbstract>) {
        this.id = data.id;
        this.userId = data.userId;
        this.locationId = data.locationId;
        this.createdAt = data.createdAt;
    }
}
