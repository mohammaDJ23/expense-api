import { BadRequestException, Injectable, type PipeTransform } from '@nestjs/common';

import type { ICurrentUser } from './currentUser.type';

@Injectable()
export class CurrentUserPipe implements PipeTransform<ICurrentUser | undefined, ICurrentUser> {
    transform(value: ICurrentUser | undefined): ICurrentUser {
        if (!value) {
            throw new BadRequestException('Current user is not found');
        }

        return value;
    }
}
