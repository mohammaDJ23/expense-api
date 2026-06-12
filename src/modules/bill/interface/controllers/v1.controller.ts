import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@/core/authentication/jwtAuth.guard';
import { HttpResponse } from '@/core/responses/http/httpResponse.decorator';
import { CurrentUser } from '@/core/user/currentUser.decorator';
import { BillService } from '@/modules/bill/applications/services/bill.service';
import { CreateBillRequestDto } from '@/modules/bill/interface/dtos/createBill.request.dto';

import { SUCCESS_CREATE_BILL_MESSAGE } from './controllers.constants';

import type { ICurrentUser } from '@/core/user/currentUser.interface';

@Controller({ version: '1', path: 'api/bill' })
export class BillController {
    constructor(private readonly billService: BillService) {}

    @Post('create')
    @UseGuards(JwtAuthGuard)
    @HttpResponse(SUCCESS_CREATE_BILL_MESSAGE, HttpStatus.CREATED)
    localSignup(
        @Body() body: CreateBillRequestDto,
        @CurrentUser() user: ICurrentUser,
    ): Promise<boolean> {
        return this.billService.create(body, user);
    }
}
