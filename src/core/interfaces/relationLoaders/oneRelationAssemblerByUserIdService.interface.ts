export interface IOneRelationAssemblerByUserIdService<TSource, TOutput> {
    assembleOne(userId: string, source: TSource): Promise<TOutput>;
}
