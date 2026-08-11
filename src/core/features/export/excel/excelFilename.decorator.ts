import { SetMetadata, type CustomDecorator } from '@nestjs/common';

import { EXCEL_FILENAME_METADATA_KEY } from './excel.constants';

export type TExcelFilenameFactory = () => string;

// eslint-disable-next-line @typescript-eslint/naming-convention
export function ExcelFilename(filenameFactory: TExcelFilenameFactory): CustomDecorator {
    return SetMetadata(EXCEL_FILENAME_METADATA_KEY, filenameFactory);
}
