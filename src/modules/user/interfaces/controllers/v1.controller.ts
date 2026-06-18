import { Controller, Get, HttpStatus, Param, Query, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@/core/authentication/jwtAuth.guard';
import { HttpResponse } from '@/core/responses/http/httpResponse.decorator';
import { SerializerInterceptor } from '@/core/serializers/serializerInterceptor.decorator';
import { CurrentUser } from '@/core/user/currentUser.decorator';
import { GetManyUsersService } from '@/modules/user/applications/services/getManyUsers.service';
import { GetUserByIdOrThrowService } from '@/modules/user/applications/services/getUserByIdOrThrow.service';
import { GetManyUsersQueryRequestDto } from '@/modules/user/interfaces/dtos/getManyUsersQuery.request.dto';
import { GetUserRequestDto } from '@/modules/user/interfaces/dtos/getUserParam.request.dto';
import { UserResponseDto } from '@/modules/user/interfaces/dtos/user.response.dto';
import { OwnerGuard } from '@/modules/user/interfaces/guards/owner.guard';

import { SUCCESS_GET_USER_MESSAGE, SUCCESS_GET_USERS_MESSAGE } from './controllers.constants';

import type { ICurrentUser } from '@/core/user/currentUser.interface';
import type { TSelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Controller({ version: '1', path: 'api/users' })
export class UserController {
    constructor(
        private readonly getUserByIdOrThrowService: GetUserByIdOrThrowService,
        private readonly getManyUsersService: GetManyUsersService,
    ) {}

    @Get()
    @UseGuards(JwtAuthGuard, OwnerGuard)
    @SerializerInterceptor(UserResponseDto)
    @HttpResponse(SUCCESS_GET_USERS_MESSAGE, HttpStatus.OK)
    getMany(@Query() query: GetManyUsersQueryRequestDto): Promise<TSelectUser[]> {
        return this.getManyUsersService.execute(query);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard, OwnerGuard)
    @SerializerInterceptor(UserResponseDto)
    @HttpResponse(SUCCESS_GET_USER_MESSAGE, HttpStatus.OK)
    getById(@Param() param: GetUserRequestDto): Promise<TSelectUser> {
        return this.getUserByIdOrThrowService.execute(param.id);
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(UserResponseDto)
    @HttpResponse(SUCCESS_GET_USER_MESSAGE, HttpStatus.OK)
    getMe(@CurrentUser() user: ICurrentUser): Promise<TSelectUser> {
        return this.getUserByIdOrThrowService.execute(user.id);
    }
}
