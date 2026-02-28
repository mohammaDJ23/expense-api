export interface IAppException extends Error {
    timestamp: string;
    statusCode: number;
}
