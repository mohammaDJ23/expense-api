import { Body, Controller, Get, HttpStatus, Param, Post, Query, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@/core/authentication/jwtAuth.guard';
import { HttpResponse } from '@/core/responses/http/httpResponse.decorator';
import { SerializerInterceptor } from '@/core/serializers/serializerInterceptor.decorator';
import { CurrentUser } from '@/core/user/currentUser.decorator';
import { BillService } from '@/modules/bill/applications/services/bill.service';
import { BillResponseDto } from '@/modules/bill/interface/dtos/bill.response.dto';
import { CreateBillRequestDto } from '@/modules/bill/interface/dtos/createBill.request.dto';
import { FindBillRequestDto } from '@/modules/bill/interface/dtos/findBill.request.dto';
import { FindBillListRequestDto } from '@/modules/bill/interface/dtos/findBillList.request.dto';

import {
    SUCCESS_CREATE_BILL_MESSAGE,
    SUCCESS_GET_BILL_MESSAGE,
    SUCCESS_GET_MANY_MESSAGE,
} from './controllers.constants';

import type { ICurrentUser } from '@/core/user/currentUser.interface';
import type { IBill } from '@/modules/bill/domain/interfaces/bill.interface';

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
        return this.billService.create(body, user.id);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(BillResponseDto)
    @HttpResponse(SUCCESS_GET_MANY_MESSAGE, HttpStatus.OK)
    findManyByUserId(
        @Query() query: FindBillListRequestDto,
        @CurrentUser() user: ICurrentUser,
    ): Promise<IBill[]> {
        return this.billService.findManyByUserId(user.id, query);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(BillResponseDto)
    @HttpResponse(SUCCESS_GET_BILL_MESSAGE, HttpStatus.OK)
    findByUserIdAndId(
        @Param() param: FindBillRequestDto,
        @CurrentUser() user: ICurrentUser,
    ): Promise<IBill> {
        return this.billService.findByUserIdAndId(user.id, param.id);
    }
}
