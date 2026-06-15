import type { ILocationAbstract } from '@/modules/location/domain/interfaces/locationAbstract.interface';

export abstract class LocationAbstract implements Partial<ILocationAbstract> {
    public readonly id?: string;
    public readonly name?: string;
    public readonly createdAt?: string;
    public readonly updatedAt?: string;

    constructor(data: Partial<ILocationAbstract>) {
        this.id = data.id;
        this.name = data.name;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
}
