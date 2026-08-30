import { Injectable } from '@nestjs/common';
import ExcelJS from 'exceljs';

import { getCurrentUTCTimestamp } from '@/core/utils/getCurrentUTCTimestamp.util';
import { toHeader } from '@/core/utils/toHeader.util';

import { USER_METADATA_KEYS, USER_METADATA_SHEET_NAME } from './excel.constants';

@Injectable()
export class ExcelMetadataSheets {
    createUserMetadataSheet(
        userId: string,
        email: string,
        workbook: ExcelJS.stream.xlsx.WorkbookWriter,
    ): void {
        const metadataSheet = workbook.addWorksheet(USER_METADATA_SHEET_NAME);
        metadataSheet.columns = USER_METADATA_KEYS.map((key) => ({
            header: toHeader(key),
            key,
            width: 40,
        }));
        metadataSheet.addRow({
            userId,
            email,
            generatedAt: getCurrentUTCTimestamp(),
        });
    }
}
