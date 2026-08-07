import { applyDecorators, Header } from '@nestjs/common';

import { EXCEL_FILE_CONTENT_TYPE } from './excelFile.constants';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function ExcelFile(filename: string): ReturnType<typeof applyDecorators> {
    return applyDecorators(
        Header('Content-Type', EXCEL_FILE_CONTENT_TYPE),
        Header('Content-Disposition', `attachment; filename="${filename}"`),
    );
}
