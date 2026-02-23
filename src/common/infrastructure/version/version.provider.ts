import { VERSION_PROVIDER } from '@/common/constants/version.constants';

import { VersionProviderImplementation } from './version.implementation';

import type { Provider } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const VersionProvider: Provider = {
    provide: VERSION_PROVIDER,
    useClass: VersionProviderImplementation,
};
