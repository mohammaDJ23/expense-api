import type { OauthProvider } from '@/modules/authentication/domain/enums/oauthProvider.enum';

interface IProps {
    provider: OauthProvider;
    providerId: string;
}

export class FindOauthAccountByProviderAndProviderIdOrNullQuery {
    constructor(public readonly props: IProps) {}
}
