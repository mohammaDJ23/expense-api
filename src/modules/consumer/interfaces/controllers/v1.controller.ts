import { Body, Controller, Get, HttpStatus, Param, Post, Query, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@/core/authentication/jwtAuth.guard';
import { IdResponseDto } from '@/core/dtos/id.response.dto';
import { HttpResponse } from '@/core/responses/http/httpResponse.decorator';
import { SerializerInterceptor } from '@/core/serializers/serializerInterceptor.decorator';
import { CurrentUser } from '@/core/user/currentUser.decorator';
import { ConsumerService } from '@/modules/consumer/applications/services/consumer.service';
import { UserConsumerService } from '@/modules/consumer/applications/services/userConsumer.service';
import { ConsumerResponseDto } from '@/modules/consumer/interfaces/dtos/consumer.response.dto';
import { CreateConsumerRequestDto } from '@/modules/consumer/interfaces/dtos/createConsumer.request.dto';
import { FindUserConsumerTargetRequestDto } from '@/modules/consumer/interfaces/dtos/findUserConsumerTarget.request.dto';
import { FindUserConsumerTargetsRequestDto } from '@/modules/consumer/interfaces/dtos/findUserConsumerTargets.request.dto';

import {
    SUCCESS_CREATE_CONSUMER_MESSAGE,
    SUCCESS_GET_CONSUMER_MESSAGE,
    SUCCESS_GET_CONSUMERS_MESSAGE,
} from './controllers.constants';

import type { IdEntity } from '@/core/entities/id.entity';
import type { ICurrentUser } from '@/core/user/currentUser.interface';
import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';

@Controller({ version: '1', path: 'api/consumers' })
export class ConsumerController {
    constructor(
        private readonly consumerService: ConsumerService,
        private readonly userConsumerService: UserConsumerService,
    ) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(IdResponseDto)
    @HttpResponse(SUCCESS_CREATE_CONSUMER_MESSAGE, HttpStatus.CREATED)
    create(
        @Body() body: CreateConsumerRequestDto,
        @CurrentUser() user: ICurrentUser,
    ): Promise<IdEntity> {
        return this.consumerService.create(user.id, body.name);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(ConsumerResponseDto)
    @HttpResponse(SUCCESS_GET_CONSUMERS_MESSAGE, HttpStatus.OK)
    findList(
        @Query() query: FindUserConsumerTargetsRequestDto,
        @CurrentUser() user: ICurrentUser,
    ): Promise<ISelectConsumer[]> {
        return this.userConsumerService.findTargetsByRefId(user.id, query);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(ConsumerResponseDto)
    @HttpResponse(SUCCESS_GET_CONSUMER_MESSAGE, HttpStatus.OK)
    findByRefIdAndTargetId(
        @Param() param: FindUserConsumerTargetRequestDto,
        @CurrentUser() user: ICurrentUser,
    ): Promise<ISelectConsumer> {
        return this.userConsumerService.findTargetByRefIdAndTargetId(user.id, param.id);
    }
}
