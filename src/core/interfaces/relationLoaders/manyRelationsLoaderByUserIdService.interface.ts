export interface IManyRelationsLoaderByUserIdService<TSource, TRelation> {
    loadMany(userId: string, sources: TSource[]): Promise<TRelation[]>;
}
