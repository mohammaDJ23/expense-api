import {
    BadRequestException,
    HttpStatus,
    Injectable,
    ValidationPipe,
    type ValidationError,
} from '@nestjs/common';

import { VALIDATION_FAILED_MESSAGE } from '@/common/constants/messages.constant';

import type { IValidationError } from '@/common/infrastructure/core/pipes/validationError.interface';

@Injectable()
export class TransformValidationResponsePipe extends ValidationPipe {
    constructor() {
        super();

        this.exceptionFactory = function exceptionFactory(
            errors: ValidationError[],
        ): BadRequestException {
            const formattedErrors = this.formatValidationErrors(errors);

            return new BadRequestException({
                message: VALIDATION_FAILED_MESSAGE,
                data: formattedErrors,
                statusCode: HttpStatus.BAD_REQUEST,
            });
        };
    }

    private formatValidationErrors(errors: ValidationError[]): IValidationError[] {
        const result: IValidationError[] = [];

        errors.forEach((error) => {
            if (error.constraints) {
                result.push({
                    property: error.property,
                    message: Object.values(error.constraints),
                });
            }

            if (Array.isArray(error.children) && error.children.length) {
                result.push(...this.formatValidationErrors(error.children));
            }
        });

        return result;
    }
}
