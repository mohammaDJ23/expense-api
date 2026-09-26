import { Controller, Get, HttpStatus, Post, Query, UseGuards } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiExtraModels,
    ApiInternalServerErrorResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiTooManyRequestsResponse,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { CurrentUser } from '@/core/features/currentUser/currentUser.decorator';
import { ExceptionDto } from '@/core/features/exceptionNormalizer/exception.dto';
import { JwtAuthGuard } from '@/core/features/jwt/jwtAuth.guard';
import { HttpResponse } from '@/core/features/responses/http/httpResponse.decorator';
import { HttpResponseDto } from '@/core/features/responses/http/httpResponse.dto';
import { SerializerInterceptor } from '@/core/features/serializer/serializerInterceptor.decorator';
import { httpBooleanResponseSwaggerSchema } from '@/infrastructure/swagger/schemas/httpBooleanResponse.schema';
import { httpExceptionResponseSwaggerSchema } from '@/infrastructure/swagger/schemas/httpExceptionResponse.schema';
import { BillResponseDto } from '@/modules/bill/interface/dtos/bill.response.dto';
import { ConsumerResponseDto } from '@/modules/consumer/interfaces/dtos/consumer.response.dto';
import { LocationResponseDto } from '@/modules/location/interfaces/dtos/location.response.dto';
import { ReceiverResponseDto } from '@/modules/receiver/interfaces/dtos/receiver.response.dto';
import { SearchService } from '@/modules/search/applications/services/search.service';
import { httpSearchResponseSwaggerSchema } from '@/modules/search/infrastructure/swagger/schemas/httpSearchResponse.schema';
import { SearchRequestDto } from '@/modules/search/interfaces/dtos/search.request.dto';
import { SearchResponseDto } from '@/modules/search/interfaces/dtos/search.response.dto';

import { SUCCESS_SEARCH_SYNC_MESSAGE, SUCCESS_SEARCH_QUERY_MESSAGE } from './v1.constants';

import type { ICurrentUser } from '@/core/features/currentUser/currentUser.type';
import type { ISearch } from '@/modules/search/domain/types/search.type';

@ApiTags('Search')
@Controller({ version: '1', path: 'api/search' })
export class SearchController {
    constructor(private readonly searchService: SearchService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(SearchResponseDto)
    @HttpResponse(SUCCESS_SEARCH_QUERY_MESSAGE, HttpStatus.OK)
    @ApiOperation({
        summary: 'Application search',
        description: 'It is including the bills, receivers, consumers and locations',
        operationId: 'globalSearch',
    })
    @ApiExtraModels(
        HttpResponseDto,
        ExceptionDto,
        SearchResponseDto,
        BillResponseDto,
        ConsumerResponseDto,
        LocationResponseDto,
        ReceiverResponseDto,
    )
    @ApiOkResponse({ schema: httpSearchResponseSwaggerSchema() })
    @ApiInternalServerErrorResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiUnauthorizedResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiTooManyRequestsResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiBadRequestResponse({ schema: httpExceptionResponseSwaggerSchema() })
    searchQuery(
        @CurrentUser() user: ICurrentUser,
        @Query() query: SearchRequestDto,
    ): Promise<ISearch> {
        return this.searchService.searchQuery(user.id, query);
    }

    @Post('sync')
    @UseGuards(JwtAuthGuard)
    @HttpResponse(SUCCESS_SEARCH_SYNC_MESSAGE, HttpStatus.OK)
    @ApiOperation({
        summary: 'Search syncing',
        description: 'It is for syncing the search engine with database',
        operationId: 'syncGlobalSearch',
    })
    @ApiExtraModels(HttpResponseDto, ExceptionDto)
    @ApiOkResponse({ schema: httpBooleanResponseSwaggerSchema() })
    @ApiInternalServerErrorResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiTooManyRequestsResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiBadRequestResponse({ schema: httpExceptionResponseSwaggerSchema() })
    searchSync(@CurrentUser() user: ICurrentUser): Promise<boolean> {
        return this.searchService.searchSync(user.id);
    }
}
