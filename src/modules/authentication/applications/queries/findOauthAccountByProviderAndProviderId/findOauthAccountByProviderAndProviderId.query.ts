import type { OauthProvider } from '@/modules/authentication/domain/enums/oauthProvider.enum';

interface IProps {
    provider: OauthProvider;
    providerId: string;
}

export class FindOauthAccountByProviderAndProviderIdQuery {
    constructor(public readonly props: IProps) {}
}
