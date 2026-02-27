import { VERSION_PROVIDER } from '@/common/infrastructure/version/version.constants';

import { VersionProviderImplementation } from './version.implementation';

import type { Provider } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const VersionProvider: Provider = {
    provide: VERSION_PROVIDER,
    useClass: VersionProviderImplementation,
};
