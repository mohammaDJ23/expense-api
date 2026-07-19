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

import { CurrentUser } from '@/core/authentication/currentUser.decorator';
import { JwtAuthGuard } from '@/core/authentication/jwtAuth.guard';
import { IdResponseDto } from '@/core/dtos/id.response.dto';
import { HttpResponse } from '@/core/responses/http/httpResponse.decorator';
import { SerializerInterceptor } from '@/core/serializers/serializerInterceptor.decorator';
import { LocationService } from '@/modules/location/applications/services/location.service';
import { CreateLocationRequestDto } from '@/modules/location/interfaces/dtos/createLocation.request.dto';
import { DeleteLocationRequestDto } from '@/modules/location/interfaces/dtos/deleteLocation.request.dto';
import { FindLocationByIdRequestDto } from '@/modules/location/interfaces/dtos/findLocationById.request.dto';
import { FindLocationListRequestDto } from '@/modules/location/interfaces/dtos/findLocationList.request.dto';
import { FindLocationListResponseDto } from '@/modules/location/interfaces/dtos/findLocationList.response.dto';
import { LocationResponseDto } from '@/modules/location/interfaces/dtos/location.response.dto';
import { UpdateLocationRequestDto } from '@/modules/location/interfaces/dtos/updateLocation.request.dto';

import {
    SUCCESS_CREATE_LOCATION_MESSAGE,
    SUCCESS_DELETE_LOCATION_MESSAGE,
    SUCCESS_FIND_LOCATION_MESSAGE,
    SUCCESS_FIND_LOCATIONS_MESSAGE,
    SUCCESS_UPDATE_LOCATION_MESSAGE,
} from './controllers.constants';

import type { ICurrentUser } from '@/core/authentication/currentUser.interface';
import type { IId } from '@/core/interfaces/id.interface';
import type { IListResult } from '@/core/interfaces/listResult.interface';
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
    ): Promise<IListResult<ISelectLocation>> {
        return this.locationService.findListByUserId(user.id, query);
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
