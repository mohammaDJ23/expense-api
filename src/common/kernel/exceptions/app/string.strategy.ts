import type { IErrorStrategy } from './errorStrategy.interface';

export class StringStrategy implements IErrorStrategy {
    canHandle(error: unknown): boolean {
        return typeof error === 'string' && error.length > 0;
    }

    getMessage(error: unknown): string {
        return error as string;
    }
}
