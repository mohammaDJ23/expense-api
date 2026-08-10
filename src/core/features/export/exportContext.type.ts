import type { PassThrough } from 'node:stream';

export interface IExportContext {
    stream: PassThrough;
}
