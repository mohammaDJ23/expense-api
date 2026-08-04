import { Module } from '@nestjs/common';

import { CqrsModule } from '@/infrastructure/cqrs/cqrs.module';
import { BillModule } from '@/modules/bill/bill.module';
import { BillsExportJob } from '@/modules/export/applications/services/billsExport.job';
import { BillsExportService } from '@/modules/export/applications/services/billsExport.service';
import { BillsExportDataLoaderService } from '@/modules/export/applications/services/billsExportDataLoader.service';
import { BillsExportGeneratorService } from '@/modules/export/applications/services/billsExportGenerator.service';
import { BillsExportMailerService } from '@/modules/export/applications/services/billsExportMailer.service';

@Module({
    imports: [BillModule, CqrsModule],
    providers: [
        BillsExportDataLoaderService,
        BillsExportGeneratorService,
        BillsExportService,
        BillsExportJob,
        BillsExportMailerService,
    ],
})
export class ExportModule {}
