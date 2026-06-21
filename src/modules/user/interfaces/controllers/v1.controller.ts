import { Controller, Get, HttpStatus, Param, Query, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@/core/authentication/jwtAuth.guard';
import { OwnerGuard } from '@/core/guards/owner.guard';
import { HttpResponse } from '@/core/responses/http/httpResponse.decorator';
import { SerializerInterceptor } from '@/core/serializers/serializerInterceptor.decorator';
import { CurrentUser } from '@/core/user/currentUser.decorator';
import { UserService } from '@/modules/user/applications/services/user.service';
import { FindUserByIdRequestDto } from '@/modules/user/interfaces/dtos/findUserById.request.dto';
import { FindUserListRequestDto } from '@/modules/user/interfaces/dtos/findUserList.request.dto';
import { UserResponseDto } from '@/modules/user/interfaces/dtos/user.response.dto';

import { SUCCESS_GET_USER_MESSAGE, SUCCESS_GET_USERS_MESSAGE } from './controllers.constants';

import type { ICurrentUser } from '@/core/user/currentUser.interface';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Controller({ version: '1', path: 'api/users' })
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @UseGuards(JwtAuthGuard, OwnerGuard)
    @SerializerInterceptor(UserResponseDto)
    @HttpResponse(SUCCESS_GET_USERS_MESSAGE, HttpStatus.OK)
    findList(@Query() query: FindUserListRequestDto): Promise<ISelectUser[]> {
        return this.userService.findList(query);
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(UserResponseDto)
    @HttpResponse(SUCCESS_GET_USER_MESSAGE, HttpStatus.OK)
    findMe(@CurrentUser() user: ICurrentUser): Promise<ISelectUser> {
        return this.userService.findById(user.id);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard, OwnerGuard)
    @SerializerInterceptor(UserResponseDto)
    @HttpResponse(SUCCESS_GET_USER_MESSAGE, HttpStatus.OK)
    findById(@Param() param: FindUserByIdRequestDto): Promise<ISelectUser> {
        return this.userService.findById(param.id);
    }
}
