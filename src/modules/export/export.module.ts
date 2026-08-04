import { Module } from '@nestjs/common';

import { BillModule } from '@/modules/bill/bill.module';
import { BillsExportDataLoaderService } from '@/modules/export/applications/services/billsExportDataLoader.service';
import { BillsExportGeneratorService } from '@/modules/export/applications/services/billsExportGenerator.service';
import { BillsExportOrchestratorService } from '@/modules/export/applications/services/billsExportOrchestrator.service';

@Module({
    imports: [BillModule],
    providers: [
        BillsExportDataLoaderService,
        BillsExportGeneratorService,
        BillsExportOrchestratorService,
    ],
})
export class ExportModule {}
