export interface IJunctionRepository<IRecord extends unknown = unknown, ITarget = unknown> {
    findByIdOrNull(id: string): Promise<IRecord | null>;
    findByIdOrThrow(id: string): Promise<IRecord>;
    findManyByRefId(refId: string): Promise<IRecord[]>;
    findByRefIdAndTargetId(refId: string, targetId: string): Promise<IRecord>;
    findManyByRefIdAndTargetIds(refId: string, targetIds: string[]): Promise<IRecord[]>;
    findTargetsByRefId(refId: string): Promise<ITarget[]>;
    findTargetByRefIdAndTargetId(refId: string, targetId: string): Promise<ITarget>;
    findTargetsByRefIdAndTargetIds(refId: string, targetIds: string[]): Promise<ITarget[]>;
}
