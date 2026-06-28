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

import { JwtAuthGuard } from '@/core/authentication/jwtAuth.guard';
import { IdResponseDto } from '@/core/dtos/id.response.dto';
import { HttpResponse } from '@/core/responses/http/httpResponse.decorator';
import { SerializerInterceptor } from '@/core/serializers/serializerInterceptor.decorator';
import { CurrentUser } from '@/core/user/currentUser.decorator';
import { LocationService } from '@/modules/location/applications/services/location.service';
import { CreateLocationRequestDto } from '@/modules/location/interfaces/dtos/createLocation.request.dto';
import { DeleteLocationRequestDto } from '@/modules/location/interfaces/dtos/deleteLocation.request.dto';
import { FindLocationByIdRequestDto } from '@/modules/location/interfaces/dtos/findLocationById.request.dto';
import { FindLocationListRequestDto } from '@/modules/location/interfaces/dtos/findLocationList.request.dto';
import { LocationResponseDto } from '@/modules/location/interfaces/dtos/location.response.dto';
import { UpdateLocationRequestDto } from '@/modules/location/interfaces/dtos/updateLocation.request.dto';

import {
    SUCCESS_CREATE_LOCATION_MESSAGE,
    SUCCESS_DELETE_LOCATION_MESSAGE,
    SUCCESS_FIND_LOCATION_MESSAGE,
    SUCCESS_FIND_LOCATIONS_MESSAGE,
    SUCCESS_UPDATE_LOCATION_MESSAGE,
} from './controllers.constants';

import type { IdEntity } from '@/core/entities/id.entity';
import type { ICurrentUser } from '@/core/user/currentUser.interface';
import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';

@Controller({ version: '1', path: 'api/locations' })
export class LocationController {
    constructor(private readonly locationService: LocationService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(IdResponseDto)
    @HttpResponse(SUCCESS_CREATE_LOCATION_MESSAGE, HttpStatus.CREATED)
    create(
        @Body() body: CreateLocationRequestDto,
        @CurrentUser() user: ICurrentUser,
    ): Promise<IdEntity> {
        return this.locationService.create(user.id, body.name);
    }

    @Put()
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(IdResponseDto)
    @HttpResponse(SUCCESS_UPDATE_LOCATION_MESSAGE, HttpStatus.OK)
    update(
        @Body() body: UpdateLocationRequestDto,
        @CurrentUser() user: ICurrentUser,
    ): Promise<IdEntity> {
        return this.locationService.update(user.id, body);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(IdResponseDto)
    @HttpResponse(SUCCESS_DELETE_LOCATION_MESSAGE, HttpStatus.OK)
    delete(
        @Param() param: DeleteLocationRequestDto,
        @CurrentUser() user: ICurrentUser,
    ): Promise<IdEntity> {
        return this.locationService.delete(user.id, param.id);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(LocationResponseDto)
    @HttpResponse(SUCCESS_FIND_LOCATIONS_MESSAGE, HttpStatus.OK)
    findListByUserId(
        @Query() query: FindLocationListRequestDto,
        @CurrentUser() user: ICurrentUser,
    ): Promise<ISelectLocation[]> {
        return this.locationService.findListByUserId(user.id, query);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(LocationResponseDto)
    @HttpResponse(SUCCESS_FIND_LOCATION_MESSAGE, HttpStatus.OK)
    findByUserIdAndId(
        @Param() param: FindLocationByIdRequestDto,
        @CurrentUser() user: ICurrentUser,
    ): Promise<ISelectLocation> {
        return this.locationService.findByUserIdAndId(user.id, param.id);
    }
}
