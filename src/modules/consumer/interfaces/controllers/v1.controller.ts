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
import { TotalResponseDto } from '@/core/dtos/total.response.dto';
import { HttpResponse } from '@/core/responses/http/httpResponse.decorator';
import { SerializerInterceptor } from '@/core/serializers/serializerInterceptor.decorator';
import { ConsumerService } from '@/modules/consumer/applications/services/consumer.service';
import { ConsumerResponseDto } from '@/modules/consumer/interfaces/dtos/consumer.response.dto';
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
} from './controllers.constants';

import type { ICurrentUser } from '@/core/authentication/currentUser.type';
import type { IId } from '@/core/types/id.type';
import type { IListResult } from '@/core/types/listResult.type';
import type { ITotal } from '@/core/types/total.type';
import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';

@Controller({ version: '1', path: 'api/consumers' })
export class ConsumerController {
    constructor(private readonly consumerService: ConsumerService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(IdResponseDto)
    @HttpResponse(SUCCESS_CREATE_CONSUMER_MESSAGE, HttpStatus.CREATED)
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
    findListByUserId(
        @CurrentUser() user: ICurrentUser,
        @Query() query: FindConsumerListRequestDto,
    ): Promise<IListResult<ISelectConsumer>> {
        return this.consumerService.findListByUserId(user.id, query);
    }

    @Get('total')
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(TotalResponseDto)
    @HttpResponse(SUCCESS_TOTAL_CONSUMERS_MESSAGE, HttpStatus.OK)
    findTotal(@CurrentUser() user: ICurrentUser): Promise<ITotal> {
        return this.consumerService.findTotal(user.id);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(ConsumerResponseDto)
    @HttpResponse(SUCCESS_FIND_CONSUMER_MESSAGE, HttpStatus.OK)
    findByUserIdAndId(
        @CurrentUser() user: ICurrentUser,
        @Param() param: FindConsumerByIdRequestDto,
    ): Promise<ISelectConsumer> {
        return this.consumerService.findByUserIdAndId(user.id, param.id);
    }
}
