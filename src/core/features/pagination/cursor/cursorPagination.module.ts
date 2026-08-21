import { Module } from '@nestjs/common';

import { CursorPaginationService } from './cursorPagination.service';

@Module({
    providers: [CursorPaginationService],
    exports: [CursorPaginationService],
})
export class CursorPaginationModule {}
