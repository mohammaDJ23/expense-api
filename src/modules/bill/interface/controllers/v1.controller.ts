import { Body, Controller, Get, HttpStatus, Post, Query, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@/core/authentication/jwtAuth.guard';
import { HttpResponse } from '@/core/responses/http/httpResponse.decorator';
import { SerializerInterceptor } from '@/core/serializers/serializerInterceptor.decorator';
import { CurrentUser } from '@/core/user/currentUser.decorator';
import { BillService } from '@/modules/bill/applications/services/bill.service';
import { BillResponseDto } from '@/modules/bill/interface/dtos/bill.response.dto';
import { CreateBillRequestDto } from '@/modules/bill/interface/dtos/createBill.request.dto';
import { GetManyBillsQueryRequestDto } from '@/modules/bill/interface/dtos/getManyBillsQuery.request.dto';

import { SUCCESS_CREATE_BILL_MESSAGE, SUCCESS_GET_MANY_MESSAGE } from './controllers.constants';

import type { ICurrentUser } from '@/core/user/currentUser.interface';
import type { TSelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';

@Controller({ version: '1', path: 'api/bills' })
export class BillController {
    constructor(private readonly billService: BillService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @HttpResponse(SUCCESS_CREATE_BILL_MESSAGE, HttpStatus.CREATED)
    create(
        @Body() body: CreateBillRequestDto,
        @CurrentUser() user: ICurrentUser,
    ): Promise<boolean> {
        return this.billService.create(body, user);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(BillResponseDto)
    @HttpResponse(SUCCESS_GET_MANY_MESSAGE, HttpStatus.OK)
    getMany(
        @Query() query: GetManyBillsQueryRequestDto,
        @CurrentUser() user: ICurrentUser,
    ): Promise<TSelectBill[]> {
        return this.billService.getMany(user.id, query);
    }
}
