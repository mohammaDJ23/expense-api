import { Body, Controller, Get, HttpStatus, Param, Post, Query, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@/core/authentication/jwtAuth.guard';
import { IdResponseDto } from '@/core/dtos/id.response.dto';
import { HttpResponse } from '@/core/responses/http/httpResponse.decorator';
import { SerializerInterceptor } from '@/core/serializers/serializerInterceptor.decorator';
import { CurrentUser } from '@/core/user/currentUser.decorator';
import { ReceiverService } from '@/modules/receiver/applications/services/receiver.service';
import { UserReceiverService } from '@/modules/receiver/applications/services/userReceiver.service';
import { CreateReceiverRequestDto } from '@/modules/receiver/interfaces/dtos/createReceiver.request.dto';
import { FindUserReceiverTargetRequestDto } from '@/modules/receiver/interfaces/dtos/findUserReceiverTarget.request.dto';
import { FindUserReceiverTargetsRequestDto } from '@/modules/receiver/interfaces/dtos/findUserReceiverTargets.request.dto';
import { ReceiverResponseDto } from '@/modules/receiver/interfaces/dtos/receiver.response.dto';

import {
    SUCCESS_CREATE_RECEIVER_MESSAGE,
    SUCCESS_FIND_RECEIVER_MESSAGE,
    SUCCESS_FIND_RECEIVERS_MESSAGE,
} from './controllers.constants';

import type { IdEntity } from '@/core/entities/id.entity';
import type { ICurrentUser } from '@/core/user/currentUser.interface';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

@Controller({ version: '1', path: 'api/receivers' })
export class ReceiverController {
    constructor(
        private readonly receiverService: ReceiverService,
        private readonly userReceiverService: UserReceiverService,
    ) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(IdResponseDto)
    @HttpResponse(SUCCESS_CREATE_RECEIVER_MESSAGE, HttpStatus.CREATED)
    create(
        @Body() body: CreateReceiverRequestDto,
        @CurrentUser() user: ICurrentUser,
    ): Promise<IdEntity> {
        return this.receiverService.create(user.id, body.name);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(ReceiverResponseDto)
    @HttpResponse(SUCCESS_FIND_RECEIVERS_MESSAGE, HttpStatus.OK)
    findList(
        @Query() query: FindUserReceiverTargetsRequestDto,
        @CurrentUser() user: ICurrentUser,
    ): Promise<ISelectReceiver[]> {
        return this.userReceiverService.findTargetsByRefId(user.id, query);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(ReceiverResponseDto)
    @HttpResponse(SUCCESS_FIND_RECEIVER_MESSAGE, HttpStatus.OK)
    findByRefIdAndTargetId(
        @Param() param: FindUserReceiverTargetRequestDto,
        @CurrentUser() user: ICurrentUser,
    ): Promise<ISelectReceiver> {
        return this.userReceiverService.findTargetByRefIdAndTargetId(user.id, param.id);
    }
}
