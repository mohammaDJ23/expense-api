import { Body, Controller, Get, HttpStatus, Param, Post, Query, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@/core/authentication/jwtAuth.guard';
import { HttpResponse } from '@/core/responses/http/httpResponse.decorator';
import { SerializerInterceptor } from '@/core/serializers/serializerInterceptor.decorator';
import { CurrentUser } from '@/core/user/currentUser.decorator';
import { CreateBillService } from '@/modules/bill/applications/services/createBill.service';
import { GetBillByIdOrThrowService } from '@/modules/bill/applications/services/getBillByIdOrThrow.service';
import { GetManyBillsService } from '@/modules/bill/applications/services/getManyBills.service';
import { BillResponseDto } from '@/modules/bill/interface/dtos/bill.response.dto';
import { CreateBillRequestDto } from '@/modules/bill/interface/dtos/createBill.request.dto';
import { GetBillRequestDto } from '@/modules/bill/interface/dtos/getBill.request.dto';
import { GetManyBillsRequestDto } from '@/modules/bill/interface/dtos/getManyBills.request.dto';

import {
    SUCCESS_CREATE_BILL_MESSAGE,
    SUCCESS_GET_BILL_MESSAGE,
    SUCCESS_GET_MANY_MESSAGE,
} from './controllers.constants';

import type { ICurrentUser } from '@/core/user/currentUser.interface';
import type { IBill } from '@/modules/bill/domain/interfaces/bill.interface';

@Controller({ version: '1', path: 'api/bills' })
export class BillController {
    constructor(
        private readonly createBillService: CreateBillService,
        private readonly getManyBillsService: GetManyBillsService,
        private readonly getBillByIdOrThrowService: GetBillByIdOrThrowService,
    ) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @HttpResponse(SUCCESS_CREATE_BILL_MESSAGE, HttpStatus.CREATED)
    create(
        @Body() body: CreateBillRequestDto,
        @CurrentUser() user: ICurrentUser,
    ): Promise<boolean> {
        return this.createBillService.execute(body, user.id);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(BillResponseDto)
    @HttpResponse(SUCCESS_GET_MANY_MESSAGE, HttpStatus.OK)
    getMany(
        @Query() query: GetManyBillsRequestDto,
        @CurrentUser() user: ICurrentUser,
    ): Promise<IBill[]> {
        return this.getManyBillsService.execute(user.id, query);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(BillResponseDto)
    @HttpResponse(SUCCESS_GET_BILL_MESSAGE, HttpStatus.OK)
    getById(@Param() param: GetBillRequestDto, @CurrentUser() user: ICurrentUser): Promise<IBill> {
        return this.getBillByIdOrThrowService.execute(user.id, param.id);
    }
}
