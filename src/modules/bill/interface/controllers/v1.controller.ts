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
import { BillService } from '@/modules/bill/applications/services/bill.service';
import { BillResponseDto } from '@/modules/bill/interface/dtos/bill.response.dto';
import { CreateBillRequestDto } from '@/modules/bill/interface/dtos/createBill.request.dto';
import { DeleteBillRequestDto } from '@/modules/bill/interface/dtos/deleteBill.request.dto';
import { FindBillRequestDto } from '@/modules/bill/interface/dtos/findBill.request.dto';
import { FindBillListRequestDto } from '@/modules/bill/interface/dtos/findBillList.request.dto';
import { FindBillListResponseDto } from '@/modules/bill/interface/dtos/findBillList.response.dto';
import { MostUsedRequestDto } from '@/modules/bill/interface/dtos/mostUsed.request.dto';
import { MostUsedConsumerResponseDto } from '@/modules/bill/interface/dtos/mostUsedConsumer.response.dto';
import { MostUsedLocationResponseDto } from '@/modules/bill/interface/dtos/mostUsedLocation.response.dto';
import { MostUsedReceiverResponseDto } from '@/modules/bill/interface/dtos/mostUsedReceiver.response.dto';
import { UpdateBillRequestDto } from '@/modules/bill/interface/dtos/updateBill.request.dto';

import {
    SUCCESS_CREATE_BILL_MESSAGE,
    SUCCESS_DELETE_BILL_MESSAGE,
    SUCCESS_FIND_BILL_MESSAGE,
    SUCCESS_FIND_BILLS_MESSAGE,
    SUCCESS_FIND_MOST_CONSUMERS_MESSAGE,
    SUCCESS_FIND_MOST_LOCATIONS_MESSAGE,
    SUCCESS_FIND_MOST_RECEIVERS_MESSAGE,
    SUCCESS_TOTAL_BILLS_MESSAGE,
    SUCCESS_UPDATE_BILL_MESSAGE,
} from './controllers.constants';

import type { ICurrentUser } from '@/core/authentication/currentUser.type';
import type { IId } from '@/core/types/id.type';
import type { IListResult } from '@/core/types/listResult.type';
import type { ITotal } from '@/core/types/total.type';
import type { IBill } from '@/modules/bill/domain/types/bill.type';
import type { IMostUsedConsumer } from '@/modules/bill/domain/types/mostUsedConsumer.type';
import type { IMostUsedLocation } from '@/modules/bill/domain/types/mostUsedLocation.type';
import type { IMostUsedReceiver } from '@/modules/bill/domain/types/mostUsedReceiver.type';

@Controller({ version: '1', path: 'api/bills' })
export class BillController {
    constructor(private readonly billService: BillService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(IdResponseDto)
    @HttpResponse(SUCCESS_CREATE_BILL_MESSAGE, HttpStatus.CREATED)
    create(@CurrentUser() user: ICurrentUser, @Body() body: CreateBillRequestDto): Promise<IId> {
        return this.billService.create(user.id, body);
    }

    @Put()
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(IdResponseDto)
    @HttpResponse(SUCCESS_UPDATE_BILL_MESSAGE, HttpStatus.OK)
    update(@CurrentUser() user: ICurrentUser, @Body() body: UpdateBillRequestDto): Promise<IId> {
        return this.billService.update(user.id, body);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(IdResponseDto)
    @HttpResponse(SUCCESS_DELETE_BILL_MESSAGE, HttpStatus.OK)
    delete(@CurrentUser() user: ICurrentUser, @Param() param: DeleteBillRequestDto): Promise<IId> {
        return this.billService.delete(user.id, param.id);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(FindBillListResponseDto)
    @HttpResponse(SUCCESS_FIND_BILLS_MESSAGE, HttpStatus.OK)
    findListByUserId(
        @CurrentUser() user: ICurrentUser,
        @Query() query: FindBillListRequestDto,
    ): Promise<IListResult<IBill>> {
        return this.billService.findListByUserId(user.id, query);
    }

    @Get('total')
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(TotalResponseDto)
    @HttpResponse(SUCCESS_TOTAL_BILLS_MESSAGE, HttpStatus.OK)
    findTotal(@CurrentUser() user: ICurrentUser): Promise<ITotal> {
        return this.billService.findTotal(user.id);
    }

    @Get('most-used-locations')
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(MostUsedLocationResponseDto)
    @HttpResponse(SUCCESS_FIND_MOST_LOCATIONS_MESSAGE, HttpStatus.OK)
    findMostUsedLocations(
        @CurrentUser() user: ICurrentUser,
        @Query() query: MostUsedRequestDto,
    ): Promise<IMostUsedLocation[]> {
        return this.billService.findMostUsedLocations(user.id, query.limit);
    }

    @Get('most-used-receivers')
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(MostUsedReceiverResponseDto)
    @HttpResponse(SUCCESS_FIND_MOST_RECEIVERS_MESSAGE, HttpStatus.OK)
    findMostUsedReceivers(
        @CurrentUser() user: ICurrentUser,
        @Query() query: MostUsedRequestDto,
    ): Promise<IMostUsedReceiver[]> {
        return this.billService.findMostUsedReceivers(user.id, query.limit);
    }

    @Get('most-used-consumers')
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(MostUsedConsumerResponseDto)
    @HttpResponse(SUCCESS_FIND_MOST_CONSUMERS_MESSAGE, HttpStatus.OK)
    findMostUsedConsumers(
        @CurrentUser() user: ICurrentUser,
        @Query() query: MostUsedRequestDto,
    ): Promise<IMostUsedConsumer[]> {
        return this.billService.findMostUsedConsumers(user.id, query.limit);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(BillResponseDto)
    @HttpResponse(SUCCESS_FIND_BILL_MESSAGE, HttpStatus.OK)
    findByUserIdAndId(
        @CurrentUser() user: ICurrentUser,
        @Param() param: FindBillRequestDto,
    ): Promise<IBill> {
        return this.billService.findByUserIdAndId(user.id, param.id);
    }
}
