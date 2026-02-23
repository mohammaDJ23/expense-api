import { INTERNAL_SERVER_ERROR } from '@/common/constants/exception.constants';

export class AppException extends Error {
    constructor(error: Error | string) {
        let errorMessage = INTERNAL_SERVER_ERROR;

        if (error instanceof Error && error.message) {
            errorMessage = error.message;
        }

        super(errorMessage);
    }
}
