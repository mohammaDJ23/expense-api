export interface IFindTargetListByRefIdRepository<TOutput, TOptions> {
    findTargetListByRefId(refId: string, options: TOptions): Promise<TOutput[]>;
}
