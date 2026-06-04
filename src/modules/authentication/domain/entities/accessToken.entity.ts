import type { IAccessToken } from '@/modules/authentication/domain/interfaces/accessToken.interface';

export class AccessTokenEntity implements IAccessToken {
    public readonly accessToken: string;

    private constructor(accessToken: string) {
        this.accessToken = accessToken;
    }

    static create(accessToken: string): AccessTokenEntity {
        return new AccessTokenEntity(accessToken);
    }
}
