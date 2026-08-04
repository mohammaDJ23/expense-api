import { Module } from '@nestjs/common';

import { BillModule } from '@/modules/bill/bill.module';
import { BillsExportDataLoaderService } from '@/modules/export/applications/services/billsExportDataLoader.service';

@Module({
    imports: [BillModule],
    providers: [BillsExportDataLoaderService],
})
export class ExportModule {}
