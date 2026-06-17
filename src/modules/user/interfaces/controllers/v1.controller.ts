import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@/core/authentication/jwtAuth.guard';
import { HttpResponse } from '@/core/responses/http/httpResponse.decorator';
import { SerializerInterceptor } from '@/core/serializers/serializerInterceptor.decorator';
import { CurrentUser } from '@/core/user/currentUser.decorator';
import { GetUserByIdOrThrowService } from '@/modules/user/applications/services/getUserByIdOrThrow.service';
import { UserResponseDto } from '@/modules/user/interfaces/dtos/user.response.dto';

import { SUCCESS_GET_USER_MESSAGE } from './controllers.constants';

import type { ICurrentUser } from '@/core/user/currentUser.interface';
import type { TSelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Controller({ version: '1', path: 'api/users' })
export class UserController {
    constructor(private readonly getUserByIdOrThrowService: GetUserByIdOrThrowService) {}

    @Get('me')
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(UserResponseDto)
    @HttpResponse(SUCCESS_GET_USER_MESSAGE, HttpStatus.OK)
    getById(@CurrentUser() user: ICurrentUser): Promise<TSelectUser> {
        return this.getUserByIdOrThrowService.execute(user.id);
    }
}
