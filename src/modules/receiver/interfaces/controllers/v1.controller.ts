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
import { ReceiverService } from '@/modules/receiver/applications/services/receiver.service';
import { CreateReceiverRequestDto } from '@/modules/receiver/interfaces/dtos/createReceiver.request.dto';
import { DeleteReceiverRequestDto } from '@/modules/receiver/interfaces/dtos/deleteReceiver.request.dto';
import { FindReceiverByIdRequestDto } from '@/modules/receiver/interfaces/dtos/findReceiverById.request.dto';
import { FindReceiverListRequestDto } from '@/modules/receiver/interfaces/dtos/findReceiverList.request.dto';
import { ReceiverResponseDto } from '@/modules/receiver/interfaces/dtos/receiver.response.dto';
import { UpdateReceiverRequestDto } from '@/modules/receiver/interfaces/dtos/updateReceiver.request.dto';

import {
    SUCCESS_CREATE_RECEIVER_MESSAGE,
    SUCCESS_DELETE_RECEIVER_MESSAGE,
    SUCCESS_FIND_RECEIVER_MESSAGE,
    SUCCESS_FIND_RECEIVERS_MESSAGE,
    SUCCESS_UPDATE_RECEIVER_MESSAGE,
} from './controllers.constants';

import type { IdEntity } from '@/core/entities/id.entity';
import type { ICurrentUser } from '@/core/user/currentUser.interface';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

@Controller({ version: '1', path: 'api/receivers' })
export class ReceiverController {
    constructor(private readonly receiverService: ReceiverService) {}

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

    @Put()
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(IdResponseDto)
    @HttpResponse(SUCCESS_UPDATE_RECEIVER_MESSAGE, HttpStatus.OK)
    update(
        @Body() body: UpdateReceiverRequestDto,
        @CurrentUser() user: ICurrentUser,
    ): Promise<IdEntity> {
        return this.receiverService.update(user.id, body);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(IdResponseDto)
    @HttpResponse(SUCCESS_DELETE_RECEIVER_MESSAGE, HttpStatus.OK)
    delete(
        @Param() param: DeleteReceiverRequestDto,
        @CurrentUser() user: ICurrentUser,
    ): Promise<IdEntity> {
        return this.receiverService.delete(user.id, param.id);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(ReceiverResponseDto)
    @HttpResponse(SUCCESS_FIND_RECEIVERS_MESSAGE, HttpStatus.OK)
    findListByUserId(
        @Query() query: FindReceiverListRequestDto,
        @CurrentUser() user: ICurrentUser,
    ): Promise<ISelectReceiver[]> {
        return this.receiverService.findListByUserId(user.id, query);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(ReceiverResponseDto)
    @HttpResponse(SUCCESS_FIND_RECEIVER_MESSAGE, HttpStatus.OK)
    findByUserIdAndId(
        @Param() param: FindReceiverByIdRequestDto,
        @CurrentUser() user: ICurrentUser,
    ): Promise<ISelectReceiver> {
        return this.receiverService.findByUserIdAndId(user.id, param.id);
    }
}
