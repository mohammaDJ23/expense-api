import { Injectable } from '@nestjs/common';
import ExcelJS from 'exceljs';

import { getCurrentUTCTimestamp } from '@/core/utils/getCurrentUTCTimestamp.util';
import { toHeader } from '@/core/utils/toHeader.util';

import { USER_METADATA_EXPORT_KEYS, USER_METADATA_SHEET_NAME } from './export.constants';

import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class ExcelExportMetadataSheets {
    createUserMetadataSheet(user: ISelectUser, workbook: ExcelJS.stream.xlsx.WorkbookWriter): void {
        const metadataSheet = workbook.addWorksheet(USER_METADATA_SHEET_NAME);
        metadataSheet.columns = USER_METADATA_EXPORT_KEYS.map((key) => ({
            header: toHeader(key),
            key,
            width: 40,
        }));
        metadataSheet.addRow({
            userId: user.id,
            email: user.email,
            generatedAt: getCurrentUTCTimestamp(),
        });
    }
}
