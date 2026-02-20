import type { Provider } from '@nestjs/common';

import { VERSION_PROVIDER } from '../../constants/version.constants';

import { VersionProviderImplementation } from './version.implementation';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const VersionProvider: Provider = {
    provide: VERSION_PROVIDER,
    useClass: VersionProviderImplementation,
};
