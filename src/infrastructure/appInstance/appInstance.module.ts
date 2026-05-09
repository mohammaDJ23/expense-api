import { Module } from '@nestjs/common';

import { AppInstanceService } from './appInstance.service';

@Module({
    providers: [AppInstanceService],
    exports: [AppInstanceService],
})
export class AppInstanceModule {}
