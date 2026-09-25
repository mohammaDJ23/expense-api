import { EXCEL_FILE_CONTENT_TYPE } from '@/core/features/export/excel/excel.constants';

// eslint-disable-next-line sonarjs/no-internal-api-use
import type { ContentObject } from 'node_modules/@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export function excelSwaggerContent(): ContentObject {
    return {
        [EXCEL_FILE_CONTENT_TYPE]: {
            schema: {
                type: 'string',
                format: 'binary',
            },
        },
    };
}
