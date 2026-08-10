import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common';

import { IdResponseDto } from '@/core/dtos/id.response.dto';
import { TotalResponseDto } from '@/core/dtos/total.response.dto';
import { JwtAuthGuard } from '@/core/features/authentication/jwtAuth.guard';
import { OwnerGuard } from '@/core/features/authorization/owner.guard';
import { CurrentUser } from '@/core/features/currentUser/currentUser.decorator';
import { HttpResponse } from '@/core/features/responses/http/httpResponse.decorator';
import { SerializerInterceptor } from '@/core/features/serializer/serializerInterceptor.decorator';
import { UserService } from '@/modules/user/applications/services/user.service';
import { FindUserByIdRequestDto } from '@/modules/user/interfaces/dtos/findUserById.request.dto';
import { FindUserListRequestDto } from '@/modules/user/interfaces/dtos/findUserList.request.dto';
import { FindUserListResponseDto } from '@/modules/user/interfaces/dtos/findUserList.response.dto';
import { UpdateUserRequestDto } from '@/modules/user/interfaces/dtos/updateUser.request.dto';
import { UserResponseDto } from '@/modules/user/interfaces/dtos/user.response.dto';

import {
    SUCCESS_DELETE_USER_MESSAGE,
    SUCCESS_FIND_USER_MESSAGE,
    SUCCESS_FIND_USERS_MESSAGE,
    SUCCESS_UPDATE_USER_MESSAGE,
    SUCCESS_TOTAL_USERS_MESSAGE,
} from './v1.constants';

import type { ICurrentUser } from '@/core/features/currentUser/currentUser.type';
import type { IId } from '@/core/types/id.type';
import type { IListResult } from '@/core/types/list/listResult.type';
import type { ITotal } from '@/core/types/total.type';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Controller({ version: '1', path: 'api/users' })
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Put()
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(IdResponseDto)
    @HttpResponse(SUCCESS_UPDATE_USER_MESSAGE, HttpStatus.OK)
    update(@CurrentUser() user: ICurrentUser, @Body() body: UpdateUserRequestDto): Promise<IId> {
        return this.userService.update(user.id, body);
    }

    @Delete()
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(IdResponseDto)
    @HttpResponse(SUCCESS_DELETE_USER_MESSAGE, HttpStatus.OK)
    delete(@CurrentUser() user: ICurrentUser): Promise<IId> {
        return this.userService.delete(user.id);
    }

    @Get()
    @UseGuards(JwtAuthGuard, OwnerGuard)
    @SerializerInterceptor(FindUserListResponseDto)
    @HttpResponse(SUCCESS_FIND_USERS_MESSAGE, HttpStatus.OK)
    findList(@Query() query: FindUserListRequestDto): Promise<IListResult<ISelectUser>> {
        return this.userService.findList(query);
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(UserResponseDto)
    @HttpResponse(SUCCESS_FIND_USER_MESSAGE, HttpStatus.OK)
    findMe(@CurrentUser() user: ICurrentUser): Promise<ISelectUser> {
        return this.userService.findById(user.id);
    }

    @Get('total')
    @UseGuards(JwtAuthGuard, OwnerGuard)
    @SerializerInterceptor(TotalResponseDto)
    @HttpResponse(SUCCESS_TOTAL_USERS_MESSAGE, HttpStatus.OK)
    findTotal(): Promise<ITotal> {
        return this.userService.findTotal();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard, OwnerGuard)
    @SerializerInterceptor(UserResponseDto)
    @HttpResponse(SUCCESS_FIND_USER_MESSAGE, HttpStatus.OK)
    findById(@Param() param: FindUserByIdRequestDto): Promise<ISelectUser> {
        return this.userService.findById(param.id);
    }
}
