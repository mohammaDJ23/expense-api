export interface IManyRelationsAssemblerByUserIdService<TSource, TOutput> {
    assembleMany(userId: string, sources: TSource[]): Promise<TOutput[]>;
}
