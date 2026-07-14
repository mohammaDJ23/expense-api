export interface IOneRelationLoaderByUserIdService<TSource, TRelation> {
    loadOne(userId: string, source: TSource): Promise<TRelation>;
}
