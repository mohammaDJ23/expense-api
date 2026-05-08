export interface IResponse<T = unknown> {
    message: string;
    data: T;
    statusCode: number;
    success: boolean;
    error: boolean;
}
