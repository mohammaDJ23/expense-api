import { Injectable } from '@nestjs/common';
import ExcelJS from 'exceljs';

import { BillsExportDataLoaderService } from './billsExportDataLoader.service';
import { BillsExportGeneratorService } from './billsExportGenerator.service';

import type { IService } from '@/core/interfaces/service.interface';

interface IInput {
    userId: string;
}

@Injectable()
export class BillsExportOrchestratorService implements IService<IInput, ExcelJS.Buffer> {
    constructor(
        private readonly billsExportDataLoader: BillsExportDataLoaderService,
        private readonly billsExportGeneratorService: BillsExportGeneratorService,
    ) {}

    async execute(input: IInput): Promise<ExcelJS.Buffer> {
        const bills = await this.billsExportDataLoader.load({
            userId: input.userId,
        });
        return this.billsExportGeneratorService.generate(bills);
    }
}
