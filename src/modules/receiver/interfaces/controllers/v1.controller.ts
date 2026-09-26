import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiExtraModels,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTooManyRequestsResponse,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { IdResponseDto } from '@/core/dtos/id.response.dto';
import { TotalResponseDto } from '@/core/dtos/total.response.dto';
import { CurrentUser } from '@/core/features/currentUser/currentUser.decorator';
import { ExceptionDto } from '@/core/features/exceptionNormalizer/exception.dto';
import { JwtAuthGuard } from '@/core/features/jwt/jwtAuth.guard';
import { HttpResponse } from '@/core/features/responses/http/httpResponse.decorator';
import { HttpResponseDto } from '@/core/features/responses/http/httpResponse.dto';
import { SerializerInterceptor } from '@/core/features/serializer/serializerInterceptor.decorator';
import { httpExceptionResponseSwaggerSchema } from '@/infrastructure/swagger/schemas/httpExceptionResponse.schema';
import { httpIdResponseSwaggerSchema } from '@/infrastructure/swagger/schemas/httpIdResponse.schema';
import { httpTotalResponseSwaggerSchema } from '@/infrastructure/swagger/schemas/httpTotalResponse.schema';
import { ReceiverService } from '@/modules/receiver/applications/services/receiver.service';
import { httpReceiverListResponseSwaggerSchema } from '@/modules/receiver/infrastructure/swagger/schemas/httpReceiverListResponse.schema';
import { httpReceiverResponseSwaggerSchema } from '@/modules/receiver/infrastructure/swagger/schemas/httpReceiverResponse.schema';
import { httpReceiversResponseSwaggerSchema } from '@/modules/receiver/infrastructure/swagger/schemas/httpReceiversResponse.schema';
import { CreateReceiverRequestDto } from '@/modules/receiver/interfaces/dtos/createReceiver.request.dto';
import { DeleteReceiverRequestDto } from '@/modules/receiver/interfaces/dtos/deleteReceiver.request.dto';
import { FindReceiverByIdRequestDto } from '@/modules/receiver/interfaces/dtos/findReceiverById.request.dto';
import { FindReceiverListRequestDto } from '@/modules/receiver/interfaces/dtos/findReceiverList.request.dto';
import { FindReceiverListResponseDto } from '@/modules/receiver/interfaces/dtos/findReceiverList.response.dto';
import { ReceiverResponseDto } from '@/modules/receiver/interfaces/dtos/receiver.response.dto';
import { ReceiverSearchRequestDto } from '@/modules/receiver/interfaces/dtos/receiverSearch.request.dto';
import { UpdateReceiverRequestDto } from '@/modules/receiver/interfaces/dtos/updateReceiver.request.dto';

import {
    SUCCESS_CREATE_RECEIVER_MESSAGE,
    SUCCESS_DELETE_RECEIVER_MESSAGE,
    SUCCESS_FIND_RECEIVER_MESSAGE,
    SUCCESS_FIND_RECEIVERS_MESSAGE,
    SUCCESS_RECEIVER_SEARCH_MESSAGE,
    SUCCESS_TOTAL_RECEIVERS_MESSAGE,
    SUCCESS_UPDATE_RECEIVER_MESSAGE,
} from './v1.constants';

import type { ICurrentUser } from '@/core/features/currentUser/currentUser.type';
import type { IId } from '@/core/types/id.type';
import type { IListResultWithTotal } from '@/core/types/list/listResultWithTotal.type';
import type { ITotal } from '@/core/types/total.type';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

@Controller({ version: '1', path: 'api/receivers' })
export class ReceiverController {
    constructor(private readonly receiverService: ReceiverService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(IdResponseDto)
    @HttpResponse(SUCCESS_CREATE_RECEIVER_MESSAGE, HttpStatus.CREATED)
    @ApiOperation({
        summary: 'Create a receiver',
        description: 'This is for creating a new receiver',
        operationId: 'createReceiver',
    })
    @ApiExtraModels(HttpResponseDto, ExceptionDto, IdResponseDto)
    @ApiCreatedResponse({ schema: httpIdResponseSwaggerSchema() })
    @ApiInternalServerErrorResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiNotFoundResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiUnauthorizedResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiTooManyRequestsResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiConflictResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiBadRequestResponse({ schema: httpExceptionResponseSwaggerSchema() })
    create(
        @CurrentUser() user: ICurrentUser,
        @Body() body: CreateReceiverRequestDto,
    ): Promise<IId> {
        return this.receiverService.create(user.id, body.name);
    }

    @Put()
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(IdResponseDto)
    @HttpResponse(SUCCESS_UPDATE_RECEIVER_MESSAGE, HttpStatus.OK)
    @ApiOperation({
        summary: 'Update a receiver',
        description: 'This is for updating a new receiver',
        operationId: 'updateReceiver',
    })
    @ApiExtraModels(HttpResponseDto, ExceptionDto, IdResponseDto)
    @ApiOkResponse({ schema: httpIdResponseSwaggerSchema() })
    @ApiInternalServerErrorResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiNotFoundResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiUnauthorizedResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiTooManyRequestsResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiConflictResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiBadRequestResponse({ schema: httpExceptionResponseSwaggerSchema() })
    update(
        @CurrentUser() user: ICurrentUser,
        @Body() body: UpdateReceiverRequestDto,
    ): Promise<IId> {
        return this.receiverService.update(user.id, body);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(IdResponseDto)
    @HttpResponse(SUCCESS_DELETE_RECEIVER_MESSAGE, HttpStatus.OK)
    @ApiOperation({
        summary: 'Delete a receiver',
        description: 'This is for deleting a new receiver',
        operationId: 'deleteReceiver',
    })
    @ApiExtraModels(HttpResponseDto, ExceptionDto, IdResponseDto)
    @ApiOkResponse({ schema: httpIdResponseSwaggerSchema() })
    @ApiInternalServerErrorResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiNotFoundResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiUnauthorizedResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiTooManyRequestsResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiBadRequestResponse({ schema: httpExceptionResponseSwaggerSchema() })
    delete(
        @CurrentUser() user: ICurrentUser,
        @Param() param: DeleteReceiverRequestDto,
    ): Promise<IId> {
        return this.receiverService.delete(user.id, param.id);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(FindReceiverListResponseDto)
    @HttpResponse(SUCCESS_FIND_RECEIVERS_MESSAGE, HttpStatus.OK)
    @ApiOperation({
        summary: 'Find a receiver list',
        description: 'This is for finding a receiver list',
        operationId: 'findReceiverList',
    })
    @ApiExtraModels(HttpResponseDto, ExceptionDto, FindReceiverListResponseDto, ReceiverResponseDto)
    @ApiOkResponse({ schema: httpReceiverListResponseSwaggerSchema() })
    @ApiInternalServerErrorResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiUnauthorizedResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiTooManyRequestsResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiBadRequestResponse({ schema: httpExceptionResponseSwaggerSchema() })
    findListByUserId(
        @CurrentUser() user: ICurrentUser,
        @Query() query: FindReceiverListRequestDto,
    ): Promise<IListResultWithTotal<ISelectReceiver, string>> {
        return this.receiverService.findListByUserId(user.id, query);
    }

    @Get('/search')
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(ReceiverResponseDto)
    @HttpResponse(SUCCESS_RECEIVER_SEARCH_MESSAGE, HttpStatus.OK)
    @ApiOperation({
        summary: 'Find the receivers by searching',
        description: 'This is for finding the receivers by searching',
        operationId: 'searchReceivers',
    })
    @ApiExtraModels(HttpResponseDto, ExceptionDto, ReceiverResponseDto)
    @ApiOkResponse({ schema: httpReceiversResponseSwaggerSchema() })
    @ApiInternalServerErrorResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiUnauthorizedResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiTooManyRequestsResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiBadRequestResponse({ schema: httpExceptionResponseSwaggerSchema() })
    search(
        @CurrentUser() user: ICurrentUser,
        @Query() query: ReceiverSearchRequestDto,
    ): Promise<ISelectReceiver[]> {
        return this.receiverService.search(user.id, query);
    }

    @Get('total')
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(TotalResponseDto)
    @HttpResponse(SUCCESS_TOTAL_RECEIVERS_MESSAGE, HttpStatus.OK)
    @ApiOperation({
        summary: 'Find the total receiver numbers',
        description: 'This is for finding the total receiver numbers',
        operationId: 'findTotalReceivers',
    })
    @ApiExtraModels(HttpResponseDto, ExceptionDto, TotalResponseDto)
    @ApiOkResponse({ schema: httpTotalResponseSwaggerSchema() })
    @ApiInternalServerErrorResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiUnauthorizedResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiTooManyRequestsResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiBadRequestResponse({ schema: httpExceptionResponseSwaggerSchema() })
    findTotal(@CurrentUser() user: ICurrentUser): Promise<ITotal> {
        return this.receiverService.findTotal(user.id);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(ReceiverResponseDto)
    @HttpResponse(SUCCESS_FIND_RECEIVER_MESSAGE, HttpStatus.OK)
    @ApiOperation({
        summary: 'Find a receiver',
        description: 'This is for finding a receiver',
        operationId: 'findReceiver',
    })
    @ApiExtraModels(HttpResponseDto, ExceptionDto, ReceiverResponseDto)
    @ApiOkResponse({ schema: httpReceiverResponseSwaggerSchema() })
    @ApiInternalServerErrorResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiNotFoundResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiUnauthorizedResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiTooManyRequestsResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiBadRequestResponse({ schema: httpExceptionResponseSwaggerSchema() })
    findByUserIdAndId(
        @CurrentUser() user: ICurrentUser,
        @Param() param: FindReceiverByIdRequestDto,
    ): Promise<ISelectReceiver> {
        return this.receiverService.findByUserIdAndId(user.id, param.id);
    }
}
