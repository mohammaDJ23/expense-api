export class AppException extends Error {
    constructor(error?: unknown) {
        let errorMessage = 'An error occured.';

        if (error instanceof Error && error.message) {
            errorMessage = error.message;
        }

        super(errorMessage);
    }
}
