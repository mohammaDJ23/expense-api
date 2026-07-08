export interface IMessageHeader {
    aggregateType: string;
    aggregateId: string;
    eventType: string;
    createdAt: string;
}
