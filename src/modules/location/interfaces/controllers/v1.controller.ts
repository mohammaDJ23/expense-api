import { Body, Controller, Get, HttpStatus, Param, Post, Query, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@/core/authentication/jwtAuth.guard';
import { IdResponseDto } from '@/core/dtos/id.response.dto';
import { HttpResponse } from '@/core/responses/http/httpResponse.decorator';
import { SerializerInterceptor } from '@/core/serializers/serializerInterceptor.decorator';
import { CurrentUser } from '@/core/user/currentUser.decorator';
import { LocationService } from '@/modules/location/applications/services/location.service';
import { UserLocationService } from '@/modules/location/applications/services/userLocation.service';
import { CreateLocationRequestDto } from '@/modules/location/interfaces/dtos/createLocation.request.dto';
import { FindUserLocationTargetRequestDto } from '@/modules/location/interfaces/dtos/findUserLocationTarget.request.dto';
import { FindUserLocationTargetsRequestDto } from '@/modules/location/interfaces/dtos/findUserLocationTargets.request.dto';
import { LocationResponseDto } from '@/modules/location/interfaces/dtos/location.response.dto';

import {
    SUCCESS_CREATE_LOCATION_MESSAGE,
    SUCCESS_FIND_LOCATIONS_MESSAGE,
    SUCCESS_FIND_LOCATION_MESSAGE,
} from './controllers.constants';

import type { IdEntity } from '@/core/entities/id.entity';
import type { ICurrentUser } from '@/core/user/currentUser.interface';
import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';

@Controller({ version: '1', path: 'api/locations' })
export class LocationController {
    constructor(
        private readonly locationService: LocationService,
        private readonly userLocationService: UserLocationService,
    ) {}

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

    @Get()
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(LocationResponseDto)
    @HttpResponse(SUCCESS_FIND_LOCATIONS_MESSAGE, HttpStatus.OK)
    findTargetListByRefId(
        @Query() query: FindUserLocationTargetsRequestDto,
        @CurrentUser() user: ICurrentUser,
    ): Promise<ISelectLocation[]> {
        return this.userLocationService.findTargetListByRefId(user.id, query);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(LocationResponseDto)
    @HttpResponse(SUCCESS_FIND_LOCATION_MESSAGE, HttpStatus.OK)
    findTargetByRefIdAndTargetId(
        @Param() param: FindUserLocationTargetRequestDto,
        @CurrentUser() user: ICurrentUser,
    ): Promise<ISelectLocation> {
        return this.userLocationService.findTargetByRefIdAndTargetId(user.id, param.id);
    }
}
