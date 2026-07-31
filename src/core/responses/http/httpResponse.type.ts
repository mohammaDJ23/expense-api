export interface IHttpResponse<T = unknown> {
    message: string;
    data: T;
    statusCode: number;
    success: boolean;
    error: boolean;
}
