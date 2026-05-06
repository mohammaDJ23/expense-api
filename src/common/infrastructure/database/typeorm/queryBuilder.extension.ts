import {
    InsertQueryBuilder,
    SelectQueryBuilder,
    UpdateQueryBuilder,
    DeleteQueryBuilder,
} from 'typeorm';

declare module 'typeorm' {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface InsertQueryBuilder<Entity> {
        toEntity(): Promise<Entity>;
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface SelectQueryBuilder<Entity> {
        toEntity(): Promise<Entity | null>;
        toEntities(): Promise<Entity[]>;
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface UpdateQueryBuilder<Entity> {
        toEntity(): Promise<Entity | null>;
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface DeleteQueryBuilder<Entity> {
        toEntity(): Promise<Entity | null>;
    }
}

InsertQueryBuilder.prototype.toEntity = async function <Entity>(): Promise<Entity> {
    const result = await this.execute();
    return result.raw[0] as Entity;
};

SelectQueryBuilder.prototype.toEntity = async function <Entity>(): Promise<Entity | null> {
    const result = await this.getRawAndEntities();
    return result.entities[0] || null;
};

SelectQueryBuilder.prototype.toEntities = async function <Entity>(): Promise<Entity[]> {
    const result = await this.getRawAndEntities();
    return result.entities as Entity[];
};

UpdateQueryBuilder.prototype.toEntity = async function <Entity>(): Promise<Entity | null> {
    const result = await this.execute();
    return result.raw[0] || null;
};

DeleteQueryBuilder.prototype.toEntity = async function <Entity>(): Promise<Entity | null> {
    const result = await this.execute();
    return result.raw[0] || null;
};
