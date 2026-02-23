import type { IErrorStrategy } from './errorStrategy.interface';

interface IMessage {
    message: string;
}

export class ObjectWithMessageStrategy implements IErrorStrategy {
    canHandle(error: unknown): boolean {
        return (
            error !== null &&
            typeof error === 'object' &&
            'message' in error &&
            typeof (error as IMessage).message === 'string' &&
            Boolean((error as IMessage).message)
        );
    }

    getMessage(error: unknown): string {
        return (error as IMessage).message;
    }
}
