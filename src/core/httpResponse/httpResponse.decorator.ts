import { applyDecorators, HttpCode, type HttpStatus } from '@nestjs/common';

import { HttpResponseMessage } from './httpResponseMessage.decorator';
import { HttpResponseStatusCode } from './httpResponseStatusCode.decorator';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function HttpResponse(
    message: string,
    statusCode: HttpStatus,
): ReturnType<typeof applyDecorators> {
    return applyDecorators(
        HttpResponseMessage(message),
        HttpResponseStatusCode(statusCode),
        HttpCode(statusCode),
    );
}
