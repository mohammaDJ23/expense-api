export interface IElasticsearchSearch {
    search(userId: string, query: string, size: number): Promise<string[]>;
}
