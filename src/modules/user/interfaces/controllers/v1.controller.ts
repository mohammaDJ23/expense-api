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

import { CurrentUser } from '@/core/authentication/currentUser.decorator';
import { JwtAuthGuard } from '@/core/authentication/jwtAuth.guard';
import { IdResponseDto } from '@/core/dtos/id.response.dto';
import { OwnerGuard } from '@/core/guards/owner.guard';
import { HttpResponse } from '@/core/responses/http/httpResponse.decorator';
import { SerializerInterceptor } from '@/core/serializers/serializerInterceptor.decorator';
import { UserService } from '@/modules/user/applications/services/user.service';
import { FindUserByIdRequestDto } from '@/modules/user/interfaces/dtos/findUserById.request.dto';
import { FindUserListRequestDto } from '@/modules/user/interfaces/dtos/findUserList.request.dto';
import { UpdateUserRequestDto } from '@/modules/user/interfaces/dtos/updateUser.request.dto';
import { UserResponseDto } from '@/modules/user/interfaces/dtos/user.response.dto';

import {
    SUCCESS_DELETE_USER_MESSAGE,
    SUCCESS_FIND_USER_MESSAGE,
    SUCCESS_FIND_USERS_MESSAGE,
    SUCCESS_UPDATE_USER_MESSAGE,
} from './controllers.constants';

import type { ICurrentUser } from '@/core/authentication/currentUser.interface';
import type { IId } from '@/core/interfaces/id.interface';
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
    @SerializerInterceptor(UserResponseDto)
    @HttpResponse(SUCCESS_FIND_USERS_MESSAGE, HttpStatus.OK)
    findList(@Query() query: FindUserListRequestDto): Promise<ISelectUser[]> {
        return this.userService.findList(query);
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(UserResponseDto)
    @HttpResponse(SUCCESS_FIND_USER_MESSAGE, HttpStatus.OK)
    findMe(@CurrentUser() user: ICurrentUser): Promise<ISelectUser> {
        return this.userService.findById(user.id);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard, OwnerGuard)
    @SerializerInterceptor(UserResponseDto)
    @HttpResponse(SUCCESS_FIND_USER_MESSAGE, HttpStatus.OK)
    findById(@Param() param: FindUserByIdRequestDto): Promise<ISelectUser> {
        return this.userService.findById(param.id);
    }
}
