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
import {
    ApiBadRequestResponse,
    ApiExtraModels,
    ApiForbiddenResponse,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiTooManyRequestsResponse,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { IdResponseDto } from '@/core/dtos/id.response.dto';
import { TotalResponseDto } from '@/core/dtos/total.response.dto';
import { OwnerGuard } from '@/core/features/authorization/owner.guard';
import { CurrentUser } from '@/core/features/currentUser/currentUser.decorator';
import { ExceptionDto } from '@/core/features/exceptionNormalizer/exception.dto';
import { JwtAuthGuard } from '@/core/features/jwt/jwtAuth.guard';
import { HttpResponse } from '@/core/features/responses/http/httpResponse.decorator';
import { HttpResponseDto } from '@/core/features/responses/http/httpResponse.dto';
import { SerializerInterceptor } from '@/core/features/serializer/serializerInterceptor.decorator';
import { httpExceptionResponseSwaggerSchema } from '@/infrastructure/swagger/schemas/httpExceptionResponse.schema';
import { httpIdResponseSwaggerSchema } from '@/infrastructure/swagger/schemas/httpIdResponse.schema';
import { httpTotalResponseSwaggerSchema } from '@/infrastructure/swagger/schemas/httpTotalResponse.schema';
import { UserService } from '@/modules/user/applications/services/user.service';
import { httpUserListResponseSwaggerSchema } from '@/modules/user/infrastructure/swagger/schemas/httpUserListResponse.schema';
import { httpUserResponseSwaggerSchema } from '@/modules/user/infrastructure/swagger/schemas/httpUserResponse.schema';
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
import type { IListResultWithTotal } from '@/core/types/list/listResultWithTotal.type';
import type { ITotal } from '@/core/types/total.type';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@ApiTags('User')
@Controller({ version: '1', path: 'api/users' })
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Put()
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(IdResponseDto)
    @HttpResponse(SUCCESS_UPDATE_USER_MESSAGE, HttpStatus.OK)
    @ApiOperation({
        summary: 'Update a user',
        description: 'This is for updating a user',
        operationId: 'updateUser',
    })
    @ApiExtraModels(HttpResponseDto, ExceptionDto, IdResponseDto)
    @ApiOkResponse({ schema: httpIdResponseSwaggerSchema() })
    @ApiInternalServerErrorResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiNotFoundResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiUnauthorizedResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiTooManyRequestsResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiBadRequestResponse({ schema: httpExceptionResponseSwaggerSchema() })
    update(@CurrentUser() user: ICurrentUser, @Body() body: UpdateUserRequestDto): Promise<IId> {
        return this.userService.update(user.id, body);
    }

    @Delete()
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(IdResponseDto)
    @HttpResponse(SUCCESS_DELETE_USER_MESSAGE, HttpStatus.OK)
    @ApiOperation({
        summary: 'Delete a user',
        description: 'This is for deleting a user',
        operationId: 'deleteUser',
    })
    @ApiExtraModels(HttpResponseDto, ExceptionDto, IdResponseDto)
    @ApiOkResponse({ schema: httpIdResponseSwaggerSchema() })
    @ApiInternalServerErrorResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiNotFoundResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiUnauthorizedResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiTooManyRequestsResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiBadRequestResponse({ schema: httpExceptionResponseSwaggerSchema() })
    delete(@CurrentUser() user: ICurrentUser): Promise<IId> {
        return this.userService.delete(user.id);
    }

    @Get()
    @UseGuards(JwtAuthGuard, OwnerGuard)
    @SerializerInterceptor(FindUserListResponseDto)
    @HttpResponse(SUCCESS_FIND_USERS_MESSAGE, HttpStatus.OK)
    @ApiOperation({
        summary: 'Find a user list',
        description: 'This is for finding a user list',
        operationId: 'findUserList',
    })
    @ApiExtraModels(HttpResponseDto, ExceptionDto, FindUserListResponseDto, UserResponseDto)
    @ApiOkResponse({ schema: httpUserListResponseSwaggerSchema() })
    @ApiInternalServerErrorResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiUnauthorizedResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiForbiddenResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiTooManyRequestsResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiBadRequestResponse({ schema: httpExceptionResponseSwaggerSchema() })
    findList(
        @Query() query: FindUserListRequestDto,
    ): Promise<IListResultWithTotal<ISelectUser, string>> {
        return this.userService.findList(query);
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(UserResponseDto)
    @HttpResponse(SUCCESS_FIND_USER_MESSAGE, HttpStatus.OK)
    @ApiOperation({
        summary: 'Find the current user',
        description: 'This is for finding the current user',
        operationId: 'findMe',
    })
    @ApiExtraModels(HttpResponseDto, ExceptionDto, UserResponseDto)
    @ApiOkResponse({ schema: httpUserResponseSwaggerSchema() })
    @ApiInternalServerErrorResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiNotFoundResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiUnauthorizedResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiTooManyRequestsResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiBadRequestResponse({ schema: httpExceptionResponseSwaggerSchema() })
    findMe(@CurrentUser() user: ICurrentUser): Promise<ISelectUser> {
        return this.userService.findById(user.id);
    }

    @Get('total')
    @UseGuards(JwtAuthGuard, OwnerGuard)
    @SerializerInterceptor(TotalResponseDto)
    @HttpResponse(SUCCESS_TOTAL_USERS_MESSAGE, HttpStatus.OK)
    @ApiOperation({
        summary: 'Find the total user numbers',
        description: 'This is for finding the total user numbers',
        operationId: 'findTotalUsers',
    })
    @ApiExtraModels(HttpResponseDto, ExceptionDto, TotalResponseDto)
    @ApiOkResponse({ schema: httpTotalResponseSwaggerSchema() })
    @ApiInternalServerErrorResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiUnauthorizedResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiTooManyRequestsResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiBadRequestResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiForbiddenResponse({ schema: httpExceptionResponseSwaggerSchema() })
    findTotal(): Promise<ITotal> {
        return this.userService.findTotal();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard, OwnerGuard)
    @SerializerInterceptor(UserResponseDto)
    @HttpResponse(SUCCESS_FIND_USER_MESSAGE, HttpStatus.OK)
    @ApiOperation({
        summary: 'Find a user',
        description: 'This is for finding a user',
        operationId: 'findUser',
    })
    @ApiExtraModels(HttpResponseDto, ExceptionDto, UserResponseDto)
    @ApiOkResponse({ schema: httpUserResponseSwaggerSchema() })
    @ApiInternalServerErrorResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiNotFoundResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiUnauthorizedResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiTooManyRequestsResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiBadRequestResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiForbiddenResponse({ schema: httpExceptionResponseSwaggerSchema() })
    findById(@Param() param: FindUserByIdRequestDto): Promise<ISelectUser> {
        return this.userService.findById(param.id);
    }
}
