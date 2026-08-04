import { Module } from '@nestjs/common';

import { BillModule } from '@/modules/bill/bill.module';
import { BillsExportService } from '@/modules/export/applications/services/billsExport.service';
import { BillsExportDataLoaderService } from '@/modules/export/applications/services/billsExportDataLoader.service';
import { BillsExportGeneratorService } from '@/modules/export/applications/services/billsExportGenerator.service';

@Module({
    imports: [BillModule],
    providers: [BillsExportDataLoaderService, BillsExportGeneratorService, BillsExportService],
})
export class ExportModule {}
