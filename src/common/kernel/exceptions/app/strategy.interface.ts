export interface IExceptionStrategy<T = unknown> {
    getException?: () => T;
    canHandle: () => boolean;
    getMessage: () => string;
    getStatusCode: () => number;
    getTimestamp: () => string;
}
