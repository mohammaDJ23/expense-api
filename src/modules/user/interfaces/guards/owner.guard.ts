import {
    ForbiddenException,
    Injectable,
    UnauthorizedException,
    type CanActivate,
    type ExecutionContext,
} from '@nestjs/common';

import { UserRoles } from '@/modules/user/domain/enums/userRoles.enum';

import type { IRequest } from '@/core/interfaces/request.interface';

@Injectable()
export class OwnerGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<IRequest>();
        const user = request.user;

        if (!user) {
            throw new UnauthorizedException();
        }

        if (user.role !== UserRoles.OWNER) {
            throw new ForbiddenException('You have no sufficient role');
        }

        return true;
    }
}
