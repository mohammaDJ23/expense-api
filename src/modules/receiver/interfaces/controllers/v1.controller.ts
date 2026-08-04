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
import { CurrentUser } from '@/core/features/authentication/currentUser.decorator';
import { JwtAuthGuard } from '@/core/features/authentication/jwtAuth.guard';
import { HttpResponse } from '@/core/features/responses/http/httpResponse.decorator';
import { SerializerInterceptor } from '@/core/features/serializer/serializerInterceptor.decorator';
import { ReceiverService } from '@/modules/receiver/applications/services/receiver.service';
import { CreateReceiverRequestDto } from '@/modules/receiver/interfaces/dtos/createReceiver.request.dto';
import { DeleteReceiverRequestDto } from '@/modules/receiver/interfaces/dtos/deleteReceiver.request.dto';
import { FindReceiverByIdRequestDto } from '@/modules/receiver/interfaces/dtos/findReceiverById.request.dto';
import { FindReceiverListRequestDto } from '@/modules/receiver/interfaces/dtos/findReceiverList.request.dto';
import { FindReceiverListResponseDto } from '@/modules/receiver/interfaces/dtos/findReceiverList.response.dto';
import { ReceiverResponseDto } from '@/modules/receiver/interfaces/dtos/receiver.response.dto';
import { UpdateReceiverRequestDto } from '@/modules/receiver/interfaces/dtos/updateReceiver.request.dto';

import {
    SUCCESS_CREATE_RECEIVER_MESSAGE,
    SUCCESS_DELETE_RECEIVER_MESSAGE,
    SUCCESS_FIND_RECEIVER_MESSAGE,
    SUCCESS_FIND_RECEIVERS_MESSAGE,
    SUCCESS_TOTAL_RECEIVERS_MESSAGE,
    SUCCESS_UPDATE_RECEIVER_MESSAGE,
} from './v1.constants';

import type { ICurrentUser } from '@/core/features/authentication/currentUser.type';
import type { IId } from '@/core/types/id.type';
import type { IListResult } from '@/core/types/listResult.type';
import type { ITotal } from '@/core/types/total.type';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

@Controller({ version: '1', path: 'api/receivers' })
export class ReceiverController {
    constructor(private readonly receiverService: ReceiverService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(IdResponseDto)
    @HttpResponse(SUCCESS_CREATE_RECEIVER_MESSAGE, HttpStatus.CREATED)
    create(
        @CurrentUser() user: ICurrentUser,
        @Body() body: CreateReceiverRequestDto,
    ): Promise<IId> {
        return this.receiverService.create(user.id, body.name);
    }

    @Put()
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(IdResponseDto)
    @HttpResponse(SUCCESS_UPDATE_RECEIVER_MESSAGE, HttpStatus.OK)
    update(
        @CurrentUser() user: ICurrentUser,
        @Body() body: UpdateReceiverRequestDto,
    ): Promise<IId> {
        return this.receiverService.update(user.id, body);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(IdResponseDto)
    @HttpResponse(SUCCESS_DELETE_RECEIVER_MESSAGE, HttpStatus.OK)
    delete(
        @CurrentUser() user: ICurrentUser,
        @Param() param: DeleteReceiverRequestDto,
    ): Promise<IId> {
        return this.receiverService.delete(user.id, param.id);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(FindReceiverListResponseDto)
    @HttpResponse(SUCCESS_FIND_RECEIVERS_MESSAGE, HttpStatus.OK)
    findListByUserId(
        @CurrentUser() user: ICurrentUser,
        @Query() query: FindReceiverListRequestDto,
    ): Promise<IListResult<ISelectReceiver>> {
        return this.receiverService.findListByUserId(user.id, query);
    }

    @Get('total')
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(TotalResponseDto)
    @HttpResponse(SUCCESS_TOTAL_RECEIVERS_MESSAGE, HttpStatus.OK)
    findTotal(@CurrentUser() user: ICurrentUser): Promise<ITotal> {
        return this.receiverService.findTotal(user.id);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(ReceiverResponseDto)
    @HttpResponse(SUCCESS_FIND_RECEIVER_MESSAGE, HttpStatus.OK)
    findByUserIdAndId(
        @CurrentUser() user: ICurrentUser,
        @Param() param: FindReceiverByIdRequestDto,
    ): Promise<ISelectReceiver> {
        return this.receiverService.findByUserIdAndId(user.id, param.id);
    }
}
