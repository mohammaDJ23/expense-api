export interface IFindByEmailIdOrNullRepository<TOutput> {
    findByEmailIdOrNull(emailId: string): Promise<TOutput | null>;
}
