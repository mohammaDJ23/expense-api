import { Controller, Get, HttpStatus, Param, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@/core/authentication/jwtAuth.guard';
import { HttpResponse } from '@/core/responses/http/httpResponse.decorator';
import { SerializerInterceptor } from '@/core/serializers/serializerInterceptor.decorator';
import { CurrentUser } from '@/core/user/currentUser.decorator';
import { GetReceiverByIdAndUserIdOrThrowService } from '@/modules/receiver/applications/services/getReceiverByIdAndUserIdOrThrow.service';
import { GetReceiverRequestDto } from '@/modules/receiver/interfaces/dtos/getReceiver.request.dto';
import { ReceiverResponseDto } from '@/modules/receiver/interfaces/dtos/receiver.response.dto';

import { SUCCESS_GET_RECEIVER_MESSAGE } from './controllers.constants';

import type { ICurrentUser } from '@/core/user/currentUser.interface';
import type { TSelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

@Controller({ version: '1', path: 'api/receivers' })
export class ReceiverController {
    constructor(
        private readonly getReceiverByIdAndUserIdOrThrowService: GetReceiverByIdAndUserIdOrThrowService,
    ) {}

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(ReceiverResponseDto)
    @HttpResponse(SUCCESS_GET_RECEIVER_MESSAGE, HttpStatus.OK)
    getByIdAndUserId(
        @Param() param: GetReceiverRequestDto,
        @CurrentUser() user: ICurrentUser,
    ): Promise<TSelectReceiver> {
        return this.getReceiverByIdAndUserIdOrThrowService.execute(user.id, param.id);
    }
}
