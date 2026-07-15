export interface IRelationAssemblerService<TInput, TOutput> {
    assemble(input: TInput): Promise<TOutput>;
}
