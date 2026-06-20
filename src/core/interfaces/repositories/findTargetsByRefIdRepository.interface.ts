export interface IFindTargetsByRefIdRepository<TOutput, TOptions> {
    findTargetsByRefId(refId: string, options: TOptions): Promise<TOutput[]>;
}
