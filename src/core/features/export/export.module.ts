import { Module } from '@nestjs/common';

import { ExcelExportMetadataSheets } from './excelExportMetadata.sheets';

@Module({
    providers: [ExcelExportMetadataSheets],
    exports: [ExcelExportMetadataSheets],
})
export class ExportModule {}
