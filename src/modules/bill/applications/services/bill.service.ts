import { Injectable, StreamableFile } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { QueryDispatcher } from '@/core/features/queryDispatcher/query.dispatcher';
import { FindEmailIdentityByUserIdrThrowQuery } from '@/modules/authentication/applications/queries/findEmailIdentityByUserIdOrThrow/findEmailIdentityByUserIdOrThrow.query';
import { FindBillsPeriodByPurchasedAtQuery } from '@/modules/bill/applications/queries/findBillsPeriodByPurchasedAt/findBillsPeriodByPurchasedAt.query';
import { FindTotalBillsByUserIdQuery } from '@/modules/bill/applications/queries/findTotalBillsByUserId/findTotalBillsByUserId.query';
import { BillsExcelExportService } from '@/modules/bill/applications/services/export/excel/billsExcelExport.service';
import { MostUsedConsumersService } from '@/modules/bill/applications/services/relations/mostUsedConsumers.service';
import { MostUsedLocationsService } from '@/modules/bill/applications/services/relations/mostUsedLocations.service';
import { MostUsedReceiversService } from '@/modules/bill/applications/services/relations/mostUsedReceivers.service';

import { CreateBillService } from './createBill.service';
import { DeleteBillService } from './deleteBill.service';
import { FindBillByUserIdAndIdOrThrowService } from './findBillByUserIdAndIdOrThrow.service';
import { FindBillListAndTotalByUserIdService } from './findBillListAndTotalByUserId.service';
import { FindBillsTimelineByPurchasedAtService } from './findBillsTimelineByPurchasedAt.service';
import { UpdateBillService } from './updateBill.service';

import type { IId } from '@/core/types/id.type';
import type { IListResultWithTotal } from '@/core/types/list/listResultWithTotal.type';
import type { ITotal } from '@/core/types/total.type';
import type { ISelectEmailIdentity } from '@/modules/authentication/infrastructure/schemas/emailIdentity.schema';
import type { IBill } from '@/modules/bill/domain/types/bill.type';
import type { IBillPeriod } from '@/modules/bill/domain/types/billPeriod.type';
import type { IBillTimeline } from '@/modules/bill/domain/types/billTimeline.type';
import type { IMostUsedConsumer } from '@/modules/bill/domain/types/mostUsedConsumer.type';
import type { IMostUsedLocation } from '@/modules/bill/domain/types/mostUsedLocation.type';
import type { IMostUsedReceiver } from '@/modules/bill/domain/types/mostUsedReceiver.type';
import type { CreateBillRequestDto } from '@/modules/bill/interface/dtos/createBill.request.dto';
import type { FindBillListRequestDto } from '@/modules/bill/interface/dtos/findBillList.request.dto';
import type { FindBillsTimelineRequestDto } from '@/modules/bill/interface/dtos/findBillsTimeline.request.dto';
import type { UpdateBillRequestDto } from '@/modules/bill/interface/dtos/updateBill.request.dto';

@Injectable()
export class BillService {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly queryDispatcher: QueryDispatcher,
        private readonly createBillService: CreateBillService,
        private readonly updateBillService: UpdateBillService,
        private readonly deleteBillService: DeleteBillService,
        private readonly findBillByUserIdAndIdOrThrowService: FindBillByUserIdAndIdOrThrowService,
        private readonly findBillListAndTotalByUserIdService: FindBillListAndTotalByUserIdService,
        private readonly mostUsedLocationsService: MostUsedLocationsService,
        private readonly mostUsedReceiversService: MostUsedReceiversService,
        private readonly mostUsedConsumersService: MostUsedConsumersService,
        private readonly findBillsTimelineByPurchasedAtService: FindBillsTimelineByPurchasedAtService,
        private readonly billsExcelExportService: BillsExcelExportService,
    ) {}

    create(userId: string, body: CreateBillRequestDto): Promise<IId> {
        return this.createBillService.execute({ body, userId });
    }

    update(userId: string, body: UpdateBillRequestDto): Promise<IId> {
        return this.updateBillService.execute({ body, userId });
    }

    delete(userId: string, billId: string): Promise<IId> {
        return this.deleteBillService.execute({ userId, billId });
    }

    findListByUserId(
        userId: string,
        query: FindBillListRequestDto,
    ): Promise<IListResultWithTotal<IBill, string>> {
        return this.findBillListAndTotalByUserIdService.execute({ userId, query });
    }

    findByUserIdAndId(userId: string, billId: string): Promise<IBill> {
        return this.findBillByUserIdAndIdOrThrowService.execute({ userId, billId });
    }

    findTotal(userId: string): Promise<ITotal> {
        return this.queryDispatcher
            .execute<FindTotalBillsByUserIdQuery, number>(
                new FindTotalBillsByUserIdQuery({
                    userId,
                }),
            )
            .then((total) => ({ total }));
    }

    findMostUsedLocations(userId: string, limit: number): Promise<IMostUsedLocation[]> {
        return this.mostUsedLocationsService.execute({ userId, limit });
    }

    findMostUsedReceivers(userId: string, limit: number): Promise<IMostUsedReceiver[]> {
        return this.mostUsedReceiversService.execute({ userId, limit });
    }

    findMostUsedConsumers(userId: string, limit: number): Promise<IMostUsedConsumer[]> {
        return this.mostUsedConsumersService.execute({ userId, limit });
    }

    findPeriod(userId: string): Promise<IBillPeriod> {
        return this.queryDispatcher.execute<FindBillsPeriodByPurchasedAtQuery, IBillPeriod>(
            new FindBillsPeriodByPurchasedAtQuery({
                userId,
            }),
        );
    }

    findTimeline(
        userId: string,
        query: FindBillsTimelineRequestDto,
        clientTimezone: string,
    ): Promise<IBillTimeline[]> {
        return this.findBillsTimelineByPurchasedAtService.execute({
            userId,
            start: query.start,
            end: query.end,
            clientTimezone,
        });
    }

    exportExcel(userId: string): Promise<StreamableFile> {
        return this.queryDispatcher
            .execute<FindEmailIdentityByUserIdrThrowQuery, ISelectEmailIdentity>(
                new FindEmailIdentityByUserIdrThrowQuery({ userId }),
            )
            .then(
                (emailIdentity) =>
                    new StreamableFile(this.billsExcelExportService.execute(emailIdentity)),
            );
    }
}
