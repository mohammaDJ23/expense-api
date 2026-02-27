import { Module } from '@nestjs/common';

import { VERSION_PROVIDER } from '@/common/constants/version.constants';

import { VersionProvider } from './version.provider';

@Module({
    providers: [VersionProvider],
    exports: [VersionModule, VERSION_PROVIDER],
})
export class VersionModule {}
