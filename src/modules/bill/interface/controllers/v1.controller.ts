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
    StreamableFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiExtraModels,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiTooManyRequestsResponse,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { IdResponseDto } from '@/core/dtos/id.response.dto';
import { TotalResponseDto } from '@/core/dtos/total.response.dto';
import { ClientTimezone } from '@/core/features/clientTimezone/clientTimezone.decorator';
import { CurrentUser } from '@/core/features/currentUser/currentUser.decorator';
import { ExceptionDto } from '@/core/features/exceptionNormalizer/exception.dto';
import { ExcelFileInterceptor } from '@/core/features/export/excel/excelFile.interceptor';
import { ExcelFilename } from '@/core/features/export/excel/excelFilename.decorator';
import { JwtAuthGuard } from '@/core/features/jwt/jwtAuth.guard';
import { HttpResponse } from '@/core/features/responses/http/httpResponse.decorator';
import { HttpResponseDto } from '@/core/features/responses/http/httpResponse.dto';
import { SkipTransformResponse } from '@/core/features/responses/http/skipTransformResponse.decorator';
import { SerializerInterceptor } from '@/core/features/serializer/serializerInterceptor.decorator';
import { excelSwaggerContent } from '@/infrastructure/swagger/content/excel.content';
import { httpExceptionResponseSwaggerSchema } from '@/infrastructure/swagger/schemas/httpExceptionResponse.schema';
import { httpIdResponseSwaggerSchema } from '@/infrastructure/swagger/schemas/httpIdResponse.schema';
import { httpTotalResponseSwaggerSchema } from '@/infrastructure/swagger/schemas/httpTotalResponse.schema';
import { BillService } from '@/modules/bill/applications/services/bill.service';
import { getBillsExcelFilename } from '@/modules/bill/applications/services/export/excel/billsExcelExport.utils';
import { httpBillListResponseSwaggerSchema } from '@/modules/bill/infrastructure/swagger/schemas/httpBillListResponse.schema';
import { httpBillResponseSwaggerSchema } from '@/modules/bill/infrastructure/swagger/schemas/httpBillResponse.schema';
import { httpBillsPeriodResponseSwaggerSchema } from '@/modules/bill/infrastructure/swagger/schemas/httpBillsPeriodResponse.schema';
import { httpBillsTimelineResponseSwaggerSchema } from '@/modules/bill/infrastructure/swagger/schemas/httpBillsTimelineResponse.schema';
import { httpMostUsedConsumersResponseSwaggerSchema } from '@/modules/bill/infrastructure/swagger/schemas/httpMostUsedConsumersResponse.schema';
import { httpMostUsedLocationsResponseSwaggerSchema } from '@/modules/bill/infrastructure/swagger/schemas/httpMostUsedLocationsResponse.schema';
import { httpMostUsedReceiversResponseSwaggerSchema } from '@/modules/bill/infrastructure/swagger/schemas/httpMostUsedReceiversResponse.schema';
import { BillResponseDto } from '@/modules/bill/interface/dtos/bill.response.dto';
import { CreateBillRequestDto } from '@/modules/bill/interface/dtos/createBill.request.dto';
import { DeleteBillRequestDto } from '@/modules/bill/interface/dtos/deleteBill.request.dto';
import { FindBillRequestDto } from '@/modules/bill/interface/dtos/findBill.request.dto';
import { FindBillListRequestDto } from '@/modules/bill/interface/dtos/findBillList.request.dto';
import { FindBillListResponseDto } from '@/modules/bill/interface/dtos/findBillList.response.dto';
import { FindBillsPeriodResponseDto } from '@/modules/bill/interface/dtos/findBillsPeriod.response.dto';
import { FindBillsTimelineRequestDto } from '@/modules/bill/interface/dtos/findBillsTimeline.request.dto';
import { FindBillsTimelineResponseDto } from '@/modules/bill/interface/dtos/findBillsTimeline.response.dto';
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
    SUCCESS_FIND_BILLS_PERIOD_MESSAGE,
    SUCCESS_FIND_MOST_CONSUMERS_MESSAGE,
    SUCCESS_FIND_MOST_LOCATIONS_MESSAGE,
    SUCCESS_FIND_MOST_RECEIVERS_MESSAGE,
    SUCCESS_TOTAL_BILLS_MESSAGE,
    SUCCESS_UPDATE_BILL_MESSAGE,
    SUCCESS_FIND_BILLS_TIMELINE_MESSAGE,
    SUCCESS_BILL_EXPORT_MESSAGE,
} from './v1.constants';

import type { ICurrentUser } from '@/core/features/currentUser/currentUser.type';
import type { IId } from '@/core/types/id.type';
import type { IListResultWithTotal } from '@/core/types/list/listResultWithTotal.type';
import type { ITotal } from '@/core/types/total.type';
import type { IBill } from '@/modules/bill/domain/types/bill.type';
import type { IBillPeriod } from '@/modules/bill/domain/types/billPeriod.type';
import type { IBillTimeline } from '@/modules/bill/domain/types/billTimeline.type';
import type { IMostUsedConsumer } from '@/modules/bill/domain/types/mostUsedConsumer.type';
import type { IMostUsedLocation } from '@/modules/bill/domain/types/mostUsedLocation.type';
import type { IMostUsedReceiver } from '@/modules/bill/domain/types/mostUsedReceiver.type';

@ApiTags('Bill')
@Controller({ version: '1', path: 'api/bills' })
export class BillController {
    constructor(private readonly billService: BillService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(IdResponseDto)
    @HttpResponse(SUCCESS_CREATE_BILL_MESSAGE, HttpStatus.CREATED)
    @ApiOperation({
        summary: 'Create a bill',
        description: 'This is for creating a new bill',
        operationId: 'createBill',
    })
    @ApiExtraModels(HttpResponseDto, ExceptionDto, IdResponseDto)
    @ApiCreatedResponse({ schema: httpIdResponseSwaggerSchema() })
    @ApiInternalServerErrorResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiNotFoundResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiUnauthorizedResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiTooManyRequestsResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiBadRequestResponse({ schema: httpExceptionResponseSwaggerSchema() })
    create(@CurrentUser() user: ICurrentUser, @Body() body: CreateBillRequestDto): Promise<IId> {
        return this.billService.create(user.id, body);
    }

    @Put()
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(IdResponseDto)
    @HttpResponse(SUCCESS_UPDATE_BILL_MESSAGE, HttpStatus.OK)
    @ApiOperation({
        summary: 'Update a bill',
        description: 'This is for updating a bill',
        operationId: 'updateBill',
    })
    @ApiExtraModels(HttpResponseDto, ExceptionDto, IdResponseDto)
    @ApiOkResponse({ schema: httpIdResponseSwaggerSchema() })
    @ApiInternalServerErrorResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiNotFoundResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiUnauthorizedResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiTooManyRequestsResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiBadRequestResponse({ schema: httpExceptionResponseSwaggerSchema() })
    update(@CurrentUser() user: ICurrentUser, @Body() body: UpdateBillRequestDto): Promise<IId> {
        return this.billService.update(user.id, body);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(IdResponseDto)
    @HttpResponse(SUCCESS_DELETE_BILL_MESSAGE, HttpStatus.OK)
    @ApiOperation({
        summary: 'Delete a bill',
        description: 'This is for deleting a bill',
        operationId: 'deleteBill',
    })
    @ApiExtraModels(HttpResponseDto, ExceptionDto, IdResponseDto)
    @ApiOkResponse({ schema: httpIdResponseSwaggerSchema() })
    @ApiInternalServerErrorResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiNotFoundResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiUnauthorizedResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiTooManyRequestsResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiBadRequestResponse({ schema: httpExceptionResponseSwaggerSchema() })
    delete(@CurrentUser() user: ICurrentUser, @Param() param: DeleteBillRequestDto): Promise<IId> {
        return this.billService.delete(user.id, param.id);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(FindBillListResponseDto)
    @HttpResponse(SUCCESS_FIND_BILLS_MESSAGE, HttpStatus.OK)
    @ApiOperation({
        summary: 'Find a bill list',
        description: 'This is for finding a bill list',
        operationId: 'findBillList',
    })
    @ApiExtraModels(HttpResponseDto, ExceptionDto, FindBillListResponseDto, BillResponseDto)
    @ApiOkResponse({ schema: httpBillListResponseSwaggerSchema() })
    @ApiInternalServerErrorResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiUnauthorizedResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiTooManyRequestsResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiBadRequestResponse({ schema: httpExceptionResponseSwaggerSchema() })
    findListByUserId(
        @CurrentUser() user: ICurrentUser,
        @Query() query: FindBillListRequestDto,
    ): Promise<IListResultWithTotal<IBill, string>> {
        return this.billService.findListByUserId(user.id, query);
    }

    @Get('total')
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(TotalResponseDto)
    @HttpResponse(SUCCESS_TOTAL_BILLS_MESSAGE, HttpStatus.OK)
    @ApiOperation({
        summary: 'Find the total bill numbers',
        description: 'This is for finding the total bill numbers',
        operationId: 'findTotalBills',
    })
    @ApiExtraModels(HttpResponseDto, ExceptionDto, TotalResponseDto)
    @ApiOkResponse({ schema: httpTotalResponseSwaggerSchema() })
    @ApiInternalServerErrorResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiUnauthorizedResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiTooManyRequestsResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiBadRequestResponse({ schema: httpExceptionResponseSwaggerSchema() })
    findTotal(@CurrentUser() user: ICurrentUser): Promise<ITotal> {
        return this.billService.findTotal(user.id);
    }

    @Get('most-used-locations')
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(MostUsedLocationResponseDto)
    @HttpResponse(SUCCESS_FIND_MOST_LOCATIONS_MESSAGE, HttpStatus.OK)
    @ApiOperation({
        summary: 'Find the most used locations',
        description: 'This is for finding the most used locations of the all bills',
        operationId: 'findMostUsedLocations',
    })
    @ApiExtraModels(HttpResponseDto, ExceptionDto, MostUsedLocationResponseDto)
    @ApiOkResponse({ schema: httpMostUsedLocationsResponseSwaggerSchema() })
    @ApiInternalServerErrorResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiUnauthorizedResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiTooManyRequestsResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiBadRequestResponse({ schema: httpExceptionResponseSwaggerSchema() })
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
    @ApiOperation({
        summary: 'Find the most used receivers',
        description: 'This is for finding the most used receivers of the all bills',
        operationId: 'findMostUsedReceivers',
    })
    @ApiExtraModels(HttpResponseDto, ExceptionDto, MostUsedReceiverResponseDto)
    @ApiOkResponse({ schema: httpMostUsedReceiversResponseSwaggerSchema() })
    @ApiInternalServerErrorResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiUnauthorizedResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiTooManyRequestsResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiBadRequestResponse({ schema: httpExceptionResponseSwaggerSchema() })
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
    @ApiOperation({
        summary: 'Find the most used consumers',
        description: 'This is for finding the most used consumers of the all bills',
        operationId: 'findMostUsedConsumers',
    })
    @ApiExtraModels(HttpResponseDto, ExceptionDto, MostUsedConsumerResponseDto)
    @ApiOkResponse({ schema: httpMostUsedConsumersResponseSwaggerSchema() })
    @ApiInternalServerErrorResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiUnauthorizedResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiTooManyRequestsResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiBadRequestResponse({ schema: httpExceptionResponseSwaggerSchema() })
    findMostUsedConsumers(
        @CurrentUser() user: ICurrentUser,
        @Query() query: MostUsedRequestDto,
    ): Promise<IMostUsedConsumer[]> {
        return this.billService.findMostUsedConsumers(user.id, query.limit);
    }

    @Get('period')
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(FindBillsPeriodResponseDto)
    @HttpResponse(SUCCESS_FIND_BILLS_PERIOD_MESSAGE, HttpStatus.OK)
    @ApiOperation({
        summary: 'Find the bills period',
        description:
            'This is for finding the start and end date of the creation of the whole bills',
        operationId: 'findBillsPeriod',
    })
    @ApiExtraModels(HttpResponseDto, ExceptionDto, FindBillsPeriodResponseDto)
    @ApiOkResponse({ schema: httpBillsPeriodResponseSwaggerSchema() })
    @ApiInternalServerErrorResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiNotFoundResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiUnauthorizedResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiTooManyRequestsResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiBadRequestResponse({ schema: httpExceptionResponseSwaggerSchema() })
    findPeriod(@CurrentUser() user: ICurrentUser): Promise<IBillPeriod> {
        return this.billService.findPeriod(user.id);
    }

    @Get('timeline')
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(FindBillsTimelineResponseDto)
    @HttpResponse(SUCCESS_FIND_BILLS_TIMELINE_MESSAGE, HttpStatus.OK)
    @ApiOperation({
        summary: 'Find the bills timeline',
        description: 'This is for finding the total bills created at a day',
        operationId: 'findBillsTimeline',
    })
    @ApiExtraModels(HttpResponseDto, ExceptionDto, FindBillsTimelineResponseDto)
    @ApiOkResponse({ schema: httpBillsTimelineResponseSwaggerSchema() })
    @ApiInternalServerErrorResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiNotFoundResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiUnauthorizedResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiTooManyRequestsResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiBadRequestResponse({ schema: httpExceptionResponseSwaggerSchema() })
    findTimeline(
        @CurrentUser() user: ICurrentUser,
        @Query() query: FindBillsTimelineRequestDto,
        @ClientTimezone() clientTimezone: string,
    ): Promise<IBillTimeline[]> {
        return this.billService.findTimeline(user.id, query, clientTimezone);
    }

    @Get('export/excel')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ExcelFileInterceptor)
    @ExcelFilename(getBillsExcelFilename)
    @SkipTransformResponse()
    @HttpResponse(SUCCESS_BILL_EXPORT_MESSAGE, HttpStatus.OK)
    @ApiOperation({
        summary: 'Export the bills',
        description: 'Export the bills as an excel file',
        operationId: 'exportBillsExcel',
    })
    @ApiExtraModels(HttpResponseDto, ExceptionDto)
    @ApiOkResponse({ content: excelSwaggerContent() })
    @ApiInternalServerErrorResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiNotFoundResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiUnauthorizedResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiTooManyRequestsResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiBadRequestResponse({ schema: httpExceptionResponseSwaggerSchema() })
    exportExcel(@CurrentUser() user: ICurrentUser): Promise<StreamableFile> {
        return this.billService.exportExcel(user.id);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(BillResponseDto)
    @HttpResponse(SUCCESS_FIND_BILL_MESSAGE, HttpStatus.OK)
    @ApiOperation({
        summary: 'Find a bill',
        description: 'This is for finding a bill',
        operationId: 'findBill',
    })
    @ApiExtraModels(HttpResponseDto, ExceptionDto, BillResponseDto)
    @ApiOkResponse({ schema: httpBillResponseSwaggerSchema() })
    @ApiInternalServerErrorResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiNotFoundResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiUnauthorizedResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiTooManyRequestsResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiBadRequestResponse({ schema: httpExceptionResponseSwaggerSchema() })
    findByUserIdAndId(
        @CurrentUser() user: ICurrentUser,
        @Param() param: FindBillRequestDto,
    ): Promise<IBill> {
        return this.billService.findByUserIdAndId(user.id, param.id);
    }
}
