// eslint-disable-next-line sonarjs/no-internal-api-use
import type { ContentObject } from 'node_modules/@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export function htmlSwaggerContent(): ContentObject {
    return {
        'text/html': {
            schema: {
                type: 'string',
            },
            example: '<!DOCTYPE html><html><body>A text</body></html>',
        },
    };
}
