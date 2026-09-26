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
    ApiCookieAuth,
    ApiCreatedResponse,
    ApiExtraModels,
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
import { CurrentUser } from '@/core/features/currentUser/currentUser.decorator';
import { ExceptionDto } from '@/core/features/exceptionNormalizer/exception.dto';
import { JwtAuthGuard } from '@/core/features/jwt/jwtAuth.guard';
import { HttpResponse } from '@/core/features/responses/http/httpResponse.decorator';
import { HttpResponseDto } from '@/core/features/responses/http/httpResponse.dto';
import { SerializerInterceptor } from '@/core/features/serializer/serializerInterceptor.decorator';
import { httpExceptionResponseSwaggerSchema } from '@/infrastructure/swagger/schemas/httpExceptionResponse.schema';
import { httpIdResponseSwaggerSchema } from '@/infrastructure/swagger/schemas/httpIdResponse.schema';
import { httpTotalResponseSwaggerSchema } from '@/infrastructure/swagger/schemas/httpTotalResponse.schema';
import { ConsumerService } from '@/modules/consumer/applications/services/consumer.service';
import { httpConsumerListResponseSwaggerSchema } from '@/modules/consumer/infrastructure/swagger/schemas/httpConsumerListResponse.schema';
import { httpConsumerResponseSwaggerSchema } from '@/modules/consumer/infrastructure/swagger/schemas/httpConsumerResponse.schema';
import { httpConsumersResponseSwaggerSchema } from '@/modules/consumer/infrastructure/swagger/schemas/httpConsumersResponse.schema';
import { ConsumerResponseDto } from '@/modules/consumer/interfaces/dtos/consumer.response.dto';
import { ConsumerSearchRequestDto } from '@/modules/consumer/interfaces/dtos/consumerSearch.request.dto';
import { CreateConsumerRequestDto } from '@/modules/consumer/interfaces/dtos/createConsumer.request.dto';
import { DeleteConsumerRequestDto } from '@/modules/consumer/interfaces/dtos/deleteConsumer.request.dto';
import { FindConsumerByIdRequestDto } from '@/modules/consumer/interfaces/dtos/findConsumerById.request.dto';
import { FindConsumerListRequestDto } from '@/modules/consumer/interfaces/dtos/findConsumerList.request.dto';
import { FindConsumerListResponseDto } from '@/modules/consumer/interfaces/dtos/findConsumerList.response.dto';
import { UpdateConsumerRequestDto } from '@/modules/consumer/interfaces/dtos/updateConsumer.request.dto';

import {
    SUCCESS_CREATE_CONSUMER_MESSAGE,
    SUCCESS_DELETE_CONSUMER_MESSAGE,
    SUCCESS_FIND_CONSUMER_MESSAGE,
    SUCCESS_FIND_CONSUMERS_MESSAGE,
    SUCCESS_UPDATE_CONSUMER_MESSAGE,
    SUCCESS_TOTAL_CONSUMERS_MESSAGE,
    SUCCESS_CONSUMER_SEARCH_MESSAGE,
} from './v1.constants';

import type { ICurrentUser } from '@/core/features/currentUser/currentUser.type';
import type { IId } from '@/core/types/id.type';
import type { IListResultWithTotal } from '@/core/types/list/listResultWithTotal.type';
import type { ITotal } from '@/core/types/total.type';
import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';

@ApiTags('Consumer')
@Controller({ version: '1', path: 'api/consumers' })
export class ConsumerController {
    constructor(private readonly consumerService: ConsumerService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(IdResponseDto)
    @HttpResponse(SUCCESS_CREATE_CONSUMER_MESSAGE, HttpStatus.CREATED)
    @ApiOperation({
        summary: 'Create a consumer',
        description: 'This is for creating a new consumer',
        operationId: 'createConsumer',
    })
    @ApiCookieAuth()
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
        @Body() body: CreateConsumerRequestDto,
    ): Promise<IId> {
        return this.consumerService.create(user.id, body.name);
    }

    @Put()
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(IdResponseDto)
    @HttpResponse(SUCCESS_UPDATE_CONSUMER_MESSAGE, HttpStatus.OK)
    @ApiOperation({
        summary: 'Update a consumer',
        description: 'This is for updating a consumer',
        operationId: 'updateConsumer',
    })
    @ApiCookieAuth()
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
        @Body() body: UpdateConsumerRequestDto,
    ): Promise<IId> {
        return this.consumerService.update(user.id, body);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(IdResponseDto)
    @HttpResponse(SUCCESS_DELETE_CONSUMER_MESSAGE, HttpStatus.OK)
    @ApiOperation({
        summary: 'Delete a consumer',
        description: 'This is for deleting a consumer',
        operationId: 'deleteConsumer',
    })
    @ApiCookieAuth()
    @ApiExtraModels(HttpResponseDto, ExceptionDto, IdResponseDto)
    @ApiOkResponse({ schema: httpIdResponseSwaggerSchema() })
    @ApiInternalServerErrorResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiNotFoundResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiUnauthorizedResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiTooManyRequestsResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiBadRequestResponse({ schema: httpExceptionResponseSwaggerSchema() })
    delete(
        @CurrentUser() user: ICurrentUser,
        @Param() param: DeleteConsumerRequestDto,
    ): Promise<IId> {
        return this.consumerService.delete(user.id, param.id);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(FindConsumerListResponseDto)
    @HttpResponse(SUCCESS_FIND_CONSUMERS_MESSAGE, HttpStatus.OK)
    @ApiOperation({
        summary: 'Find a consumer list',
        description: 'This is for finding a consumer list',
        operationId: 'findConsumerList',
    })
    @ApiCookieAuth()
    @ApiExtraModels(HttpResponseDto, ExceptionDto, FindConsumerListResponseDto, ConsumerResponseDto)
    @ApiOkResponse({ schema: httpConsumerListResponseSwaggerSchema() })
    @ApiInternalServerErrorResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiUnauthorizedResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiTooManyRequestsResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiBadRequestResponse({ schema: httpExceptionResponseSwaggerSchema() })
    findListByUserId(
        @CurrentUser() user: ICurrentUser,
        @Query() query: FindConsumerListRequestDto,
    ): Promise<IListResultWithTotal<ISelectConsumer, string>> {
        return this.consumerService.findListByUserId(user.id, query);
    }

    @Get('/search')
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(ConsumerResponseDto)
    @HttpResponse(SUCCESS_CONSUMER_SEARCH_MESSAGE, HttpStatus.OK)
    @ApiOperation({
        summary: 'Find the consumers by searching',
        description: 'This is for finding the consumers by searching',
        operationId: 'searchConsumers',
    })
    @ApiCookieAuth()
    @ApiExtraModels(HttpResponseDto, ExceptionDto, ConsumerResponseDto)
    @ApiOkResponse({ schema: httpConsumersResponseSwaggerSchema() })
    @ApiInternalServerErrorResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiUnauthorizedResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiTooManyRequestsResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiBadRequestResponse({ schema: httpExceptionResponseSwaggerSchema() })
    search(
        @CurrentUser() user: ICurrentUser,
        @Query() query: ConsumerSearchRequestDto,
    ): Promise<ISelectConsumer[]> {
        return this.consumerService.search(user.id, query);
    }

    @Get('total')
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(TotalResponseDto)
    @HttpResponse(SUCCESS_TOTAL_CONSUMERS_MESSAGE, HttpStatus.OK)
    @ApiOperation({
        summary: 'Find the total consumer numbers',
        description: 'This is for finding the total consumer numbers',
        operationId: 'findTotalConsumers',
    })
    @ApiCookieAuth()
    @ApiExtraModels(HttpResponseDto, ExceptionDto, TotalResponseDto)
    @ApiOkResponse({ schema: httpTotalResponseSwaggerSchema() })
    @ApiInternalServerErrorResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiUnauthorizedResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiTooManyRequestsResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiBadRequestResponse({ schema: httpExceptionResponseSwaggerSchema() })
    findTotal(@CurrentUser() user: ICurrentUser): Promise<ITotal> {
        return this.consumerService.findTotal(user.id);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(ConsumerResponseDto)
    @HttpResponse(SUCCESS_FIND_CONSUMER_MESSAGE, HttpStatus.OK)
    @ApiOperation({
        summary: 'Find a consumer',
        description: 'This is for finding a consumer',
        operationId: 'findConsumer',
    })
    @ApiCookieAuth()
    @ApiExtraModels(HttpResponseDto, ExceptionDto, ConsumerResponseDto)
    @ApiOkResponse({ schema: httpConsumerResponseSwaggerSchema() })
    @ApiInternalServerErrorResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiNotFoundResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiUnauthorizedResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiTooManyRequestsResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiBadRequestResponse({ schema: httpExceptionResponseSwaggerSchema() })
    findByUserIdAndId(
        @CurrentUser() user: ICurrentUser,
        @Param() param: FindConsumerByIdRequestDto,
    ): Promise<ISelectConsumer> {
        return this.consumerService.findByUserIdAndId(user.id, param.id);
    }
}
