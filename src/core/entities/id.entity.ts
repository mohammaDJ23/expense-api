export class IdEntity {
    private constructor(public readonly id: string) {}

    static create(id: string): IdEntity {
        return new IdEntity(id);
    }
}
