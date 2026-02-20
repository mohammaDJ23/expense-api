import { Module } from '@nestjs/common';

import { VersionProvider } from './version.provider';

@Module({
    providers: [VersionProvider],
})
export class VersionModule {}
