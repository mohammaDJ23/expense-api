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

import { IdResponseDto } from '@/core/dtos/id.response.dto';
import { TotalResponseDto } from '@/core/dtos/total.response.dto';
import { CurrentUser } from '@/core/features/currentUser/currentUser.decorator';
import { JwtAuthGuard } from '@/core/features/jwt/jwtAuth.guard';
import { HttpResponse } from '@/core/features/responses/http/httpResponse.decorator';
import { SerializerInterceptor } from '@/core/features/serializer/serializerInterceptor.decorator';
import { LocationService } from '@/modules/location/applications/services/location.service';
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

@Controller({ version: '1', path: 'api/locations' })
export class LocationController {
    constructor(private readonly locationService: LocationService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(IdResponseDto)
    @HttpResponse(SUCCESS_CREATE_LOCATION_MESSAGE, HttpStatus.CREATED)
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
    findTotal(@CurrentUser() user: ICurrentUser): Promise<ITotal> {
        return this.locationService.findTotal(user.id);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(LocationResponseDto)
    @HttpResponse(SUCCESS_FIND_LOCATION_MESSAGE, HttpStatus.OK)
    findByUserIdAndId(
        @CurrentUser() user: ICurrentUser,
        @Param() param: FindLocationByIdRequestDto,
    ): Promise<ISelectLocation> {
        return this.locationService.findByUserIdAndId(user.id, param.id);
    }
}
