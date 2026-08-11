import { Module } from '@nestjs/common';

import { ExcelMetadataSheets } from '@/core/features/export/excel/excelMetadata.sheets';

@Module({
    providers: [ExcelMetadataSheets],
    exports: [ExcelMetadataSheets],
})
export class ExcelModule {}
