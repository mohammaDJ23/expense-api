import {
    type CallHandler,
    type ExecutionContext,
    Injectable,
    InternalServerErrorException,
    type NestInterceptor,
    StreamableFile,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
// eslint-disable-next-line import-x/no-deprecated
import { map } from 'rxjs/operators';

import { EXCEL_FILE_CONTENT_TYPE, EXCEL_FILENAME_METADATA_KEY } from './excel.constants';

import type { TExcelFilenameFactory } from './excelFilename.decorator';
import type { Response } from 'express';

@Injectable()
export class ExcelFileInterceptor implements NestInterceptor<StreamableFile, StreamableFile> {
    constructor(private readonly reflector: Reflector) {}

    intercept(
        context: ExecutionContext,
        next: CallHandler<StreamableFile>,
    ): Observable<StreamableFile> {
        const filenameFactory = this.reflector.get<TExcelFilenameFactory | undefined>(
            EXCEL_FILENAME_METADATA_KEY,
            context.getHandler(),
        );

        if (!filenameFactory) {
            throw new InternalServerErrorException(
                'ExcelFileInterceptor requires @ExcelFilename()',
            );
        }

        const response = context.switchToHttp().getResponse<Response>();

        return next.handle().pipe(
            // eslint-disable-next-line import-x/no-deprecated
            map((stream) => {
                response.setHeader('Content-Type', EXCEL_FILE_CONTENT_TYPE);
                response.setHeader(
                    'Content-Disposition',
                    `attachment; filename="${filenameFactory()}"`,
                );

                return stream;
            }),
        );
    }
}
