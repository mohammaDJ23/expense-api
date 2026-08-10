import type { IExportContext } from '@/core/types/exportContext.type';

export interface IExportGenerator<TRow> {
    initialize(): IExportContext;
    addRows(context: IExportContext, rows: TRow[]): void;
    generate(context: IExportContext): Promise<void>;
}
