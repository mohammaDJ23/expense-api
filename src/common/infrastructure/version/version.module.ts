import { Module } from '@nestjs/common';

import { VERSION_PROVIDER } from './version.constants';
import { VersionProvider } from './version.provider';

@Module({
    providers: [
        {
            provide: VERSION_PROVIDER,
            useClass: VersionProvider,
        },
    ],
    exports: [VERSION_PROVIDER],
})
export class VersionModule {}
