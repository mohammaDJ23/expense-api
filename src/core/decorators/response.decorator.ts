import { applyDecorators, HttpCode, type HttpStatus } from '@nestjs/common';

import { ResponseMessage } from './responseMessage.decorator';
import { ResponseStatusCode } from './responseStatusCode.decorator';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function Response(
    message: string,
    statusCode: HttpStatus,
): ReturnType<typeof applyDecorators> {
    return applyDecorators(
        ResponseMessage(message),
        ResponseStatusCode(statusCode),
        HttpCode(statusCode),
    );
}
