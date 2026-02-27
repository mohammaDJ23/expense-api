export interface IErrorStrategy {
    canHandle: (error: unknown) => boolean;
    getMessage: (error: unknown) => string;
}
