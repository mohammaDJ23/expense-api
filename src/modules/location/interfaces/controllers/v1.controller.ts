import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@/core/authentication/jwtAuth.guard';
import { HttpResponse } from '@/core/responses/http/httpResponse.decorator';
import { SerializerInterceptor } from '@/core/serializers/serializerInterceptor.decorator';
import { CurrentUser } from '@/core/user/currentUser.decorator';
import { UserLocationService } from '@/modules/location/applications/services/userLocation.service';
import { FindUserLocationTargetsRequestDto } from '@/modules/location/interfaces/dtos/findUserLocationTargets.request.dto';
import { LocationResponseDto } from '@/modules/location/interfaces/dtos/location.response.dto';

import { SUCCESS_GET_LOCATIONS_MESSAGE } from './controllers.constants';

import type { ICurrentUser } from '@/core/user/currentUser.interface';
import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';

@Controller({ version: '1', path: 'api/locations' })
export class LocationController {
    constructor(private readonly userLocationService: UserLocationService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(LocationResponseDto)
    @HttpResponse(SUCCESS_GET_LOCATIONS_MESSAGE, HttpStatus.OK)
    findList(
        @Query() query: FindUserLocationTargetsRequestDto,
        @CurrentUser() user: ICurrentUser,
    ): Promise<ISelectLocation[]> {
        return this.userLocationService.findTargetsByRefId(user.id, query);
    }
}
