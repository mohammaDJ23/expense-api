import { Injectable } from '@nestjs/common';

import { GoogleLoginService } from './googleLogin.service';

import type { ICurrentUser } from '@/core/interfaces/currentUser.interface';
import type { AccessTokenEntity } from '@/modules/authentication/domain/entities/accessToken.entity';

@Injectable()
export class GoogleProviderService {
    constructor(private readonly googleLoginService: GoogleLoginService) {}

    login(user: ICurrentUser): AccessTokenEntity {
        return this.googleLoginService.login(user);
    }
}
