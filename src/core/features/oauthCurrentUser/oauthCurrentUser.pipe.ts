import { BadRequestException, Injectable, type PipeTransform } from '@nestjs/common';

import type { IOauthCurrentUser } from './oauthCurrentUser.type';

@Injectable()
export class OauthCurrentUserPipe implements PipeTransform<
    IOauthCurrentUser | undefined,
    IOauthCurrentUser
> {
    transform(value: IOauthCurrentUser | undefined): IOauthCurrentUser {
        if (!value) {
            throw new BadRequestException('Oauth current user is not found');
        }

        return value;
    }
}
