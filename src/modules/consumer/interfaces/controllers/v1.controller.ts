import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@/core/authentication/jwtAuth.guard';
import { HttpResponse } from '@/core/responses/http/httpResponse.decorator';
import { SerializerInterceptor } from '@/core/serializers/serializerInterceptor.decorator';
import { CurrentUser } from '@/core/user/currentUser.decorator';
import { UserConsumerService } from '@/modules/consumer/applications/services/userConsumer.service';
import { ConsumerResponseDto } from '@/modules/consumer/interfaces/dtos/consumer.response.dto';
import { FindUserConsumerTargetsRequestDto } from '@/modules/consumer/interfaces/dtos/findUserConsumerTargets.request.dto';

import { SUCCESS_GET_CONSUMERS_MESSAGE } from './controllers.constants';

import type { ICurrentUser } from '@/core/user/currentUser.interface';
import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';

@Controller({ version: '1', path: 'api/consumers' })
export class ConsumerController {
    constructor(private readonly userConsumerService: UserConsumerService) {}

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
}
