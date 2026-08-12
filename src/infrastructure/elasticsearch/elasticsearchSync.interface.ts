export interface IElasticsearchSync {
    sync(userId: string): Promise<void>;
}
