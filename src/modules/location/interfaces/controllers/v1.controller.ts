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
import { LocationService } from '@/modules/location/applications/services/location.service';
import { httpLocationListResponseSwaggerSchema } from '@/modules/location/infrastructure/swagger/schemas/httpLocationListResponse.schema';
import { httpLocationResponseSwaggerSchema } from '@/modules/location/infrastructure/swagger/schemas/httpLocationResponse.schema';
import { httpLocationsResponseSwaggerSchema } from '@/modules/location/infrastructure/swagger/schemas/httpLocationsResponse.schema';
import { CreateLocationRequestDto } from '@/modules/location/interfaces/dtos/createLocation.request.dto';
import { DeleteLocationRequestDto } from '@/modules/location/interfaces/dtos/deleteLocation.request.dto';
import { FindLocationByIdRequestDto } from '@/modules/location/interfaces/dtos/findLocationById.request.dto';
import { FindLocationListRequestDto } from '@/modules/location/interfaces/dtos/findLocationList.request.dto';
import { FindLocationListResponseDto } from '@/modules/location/interfaces/dtos/findLocationList.response.dto';
import { LocationResponseDto } from '@/modules/location/interfaces/dtos/location.response.dto';
import { LocationSearchRequestDto } from '@/modules/location/interfaces/dtos/locationSearch.request.dto';
import { UpdateLocationRequestDto } from '@/modules/location/interfaces/dtos/updateLocation.request.dto';

import {
    SUCCESS_CREATE_LOCATION_MESSAGE,
    SUCCESS_DELETE_LOCATION_MESSAGE,
    SUCCESS_FIND_LOCATION_MESSAGE,
    SUCCESS_FIND_LOCATIONS_MESSAGE,
    SUCCESS_LOCATION_SEARCH_MESSAGE,
    SUCCESS_TOTAL_LOCATIONS_MESSAGE,
    SUCCESS_UPDATE_LOCATION_MESSAGE,
} from './v1.constants';

import type { ICurrentUser } from '@/core/features/currentUser/currentUser.type';
import type { IId } from '@/core/types/id.type';
import type { IListResultWithTotal } from '@/core/types/list/listResultWithTotal.type';
import type { ITotal } from '@/core/types/total.type';
import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';

@ApiTags('Location')
@Controller({ version: '1', path: 'api/locations' })
export class LocationController {
    constructor(private readonly locationService: LocationService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(IdResponseDto)
    @HttpResponse(SUCCESS_CREATE_LOCATION_MESSAGE, HttpStatus.CREATED)
    @ApiOperation({
        summary: 'Create a location',
        description: 'This is for creating a new location',
        operationId: 'createLocation',
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
        @Body() body: CreateLocationRequestDto,
    ): Promise<IId> {
        return this.locationService.create(user.id, body.name);
    }

    @Put()
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(IdResponseDto)
    @HttpResponse(SUCCESS_UPDATE_LOCATION_MESSAGE, HttpStatus.OK)
    @ApiOperation({
        summary: 'Update a location',
        description: 'This is for updating a location',
        operationId: 'updateLocation',
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
        @Body() body: UpdateLocationRequestDto,
    ): Promise<IId> {
        return this.locationService.update(user.id, body);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(IdResponseDto)
    @HttpResponse(SUCCESS_DELETE_LOCATION_MESSAGE, HttpStatus.OK)
    @ApiOperation({
        summary: 'Delete a location',
        description: 'This is for deleting a location',
        operationId: 'deleteLocation',
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
        @Param() param: DeleteLocationRequestDto,
    ): Promise<IId> {
        return this.locationService.delete(user.id, param.id);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(FindLocationListResponseDto)
    @HttpResponse(SUCCESS_FIND_LOCATIONS_MESSAGE, HttpStatus.OK)
    @ApiOperation({
        summary: 'Find a location list',
        description: 'This is for finding a location list',
        operationId: 'findLocationList',
    })
    @ApiCookieAuth()
    @ApiExtraModels(HttpResponseDto, ExceptionDto, FindLocationListResponseDto, LocationResponseDto)
    @ApiOkResponse({ schema: httpLocationListResponseSwaggerSchema() })
    @ApiInternalServerErrorResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiUnauthorizedResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiTooManyRequestsResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiBadRequestResponse({ schema: httpExceptionResponseSwaggerSchema() })
    findListByUserId(
        @CurrentUser() user: ICurrentUser,
        @Query() query: FindLocationListRequestDto,
    ): Promise<IListResultWithTotal<ISelectLocation, string>> {
        return this.locationService.findListByUserId(user.id, query);
    }

    @Get('/search')
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(LocationResponseDto)
    @HttpResponse(SUCCESS_LOCATION_SEARCH_MESSAGE, HttpStatus.OK)
    @ApiOperation({
        summary: 'Find the locations by searching',
        description: 'This is for finding the locations by searching',
        operationId: 'searchLocations',
    })
    @ApiCookieAuth()
    @ApiExtraModels(HttpResponseDto, ExceptionDto, LocationResponseDto)
    @ApiOkResponse({ schema: httpLocationsResponseSwaggerSchema() })
    @ApiInternalServerErrorResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiUnauthorizedResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiTooManyRequestsResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiBadRequestResponse({ schema: httpExceptionResponseSwaggerSchema() })
    search(
        @CurrentUser() user: ICurrentUser,
        @Query() query: LocationSearchRequestDto,
    ): Promise<ISelectLocation[]> {
        return this.locationService.search(user.id, query);
    }

    @Get('total')
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(TotalResponseDto)
    @HttpResponse(SUCCESS_TOTAL_LOCATIONS_MESSAGE, HttpStatus.OK)
    @ApiOperation({
        summary: 'Find the total location numbers',
        description: 'This is for finding the total location numbers',
        operationId: 'findTotalLocations',
    })
    @ApiCookieAuth()
    @ApiExtraModels(HttpResponseDto, ExceptionDto, TotalResponseDto)
    @ApiOkResponse({ schema: httpTotalResponseSwaggerSchema() })
    @ApiInternalServerErrorResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiUnauthorizedResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiTooManyRequestsResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiBadRequestResponse({ schema: httpExceptionResponseSwaggerSchema() })
    findTotal(@CurrentUser() user: ICurrentUser): Promise<ITotal> {
        return this.locationService.findTotal(user.id);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(LocationResponseDto)
    @HttpResponse(SUCCESS_FIND_LOCATION_MESSAGE, HttpStatus.OK)
    @ApiOperation({
        summary: 'Find a location',
        description: 'This is for finding a location',
        operationId: 'findLocation',
    })
    @ApiCookieAuth()
    @ApiExtraModels(HttpResponseDto, ExceptionDto, LocationResponseDto)
    @ApiOkResponse({ schema: httpLocationResponseSwaggerSchema() })
    @ApiInternalServerErrorResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiNotFoundResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiUnauthorizedResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiTooManyRequestsResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiBadRequestResponse({ schema: httpExceptionResponseSwaggerSchema() })
    findByUserIdAndId(
        @CurrentUser() user: ICurrentUser,
        @Param() param: FindLocationByIdRequestDto,
    ): Promise<ISelectLocation> {
        return this.locationService.findByUserIdAndId(user.id, param.id);
    }
}
