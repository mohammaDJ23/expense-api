import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@/core/authentication/jwtAuth.guard';
import { HttpResponse } from '@/core/responses/http/httpResponse.decorator';
import { SerializerInterceptor } from '@/core/serializers/serializerInterceptor.decorator';
import { CurrentUser } from '@/core/user/currentUser.decorator';
import { UserReceiverService } from '@/modules/receiver/applications/services/userReceiver.service';
import { SUCCESS_GET_RECEIVERS_MESSAGE } from '@/modules/receiver/interfaces/controllers/controllers.constants';
import { FindUserReceiverTargetsRequestDto } from '@/modules/receiver/interfaces/dtos/findUserReceiverTargets.request.dto';
import { ReceiverResponseDto } from '@/modules/receiver/interfaces/dtos/receiver.response.dto';

import type { ICurrentUser } from '@/core/user/currentUser.interface';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

@Controller({ version: '1', path: 'api/receivers' })
export class ReceiverController {
    constructor(private readonly userReceiverService: UserReceiverService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(ReceiverResponseDto)
    @HttpResponse(SUCCESS_GET_RECEIVERS_MESSAGE, HttpStatus.OK)
    findList(
        @Query() query: FindUserReceiverTargetsRequestDto,
        @CurrentUser() user: ICurrentUser,
    ): Promise<ISelectReceiver[]> {
        return this.userReceiverService.findTargetsByRefId(user.id, query);
    }
}
