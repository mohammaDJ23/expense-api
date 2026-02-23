import type { IErrorStrategy } from './errorStrategy.interface';

export class ErrorStrategy implements IErrorStrategy {
    canHandle(error: unknown): boolean {
        return error instanceof Error && Boolean(error.message);
    }

    getMessage(error: unknown): string {
        return (error as Error).message;
    }
}
