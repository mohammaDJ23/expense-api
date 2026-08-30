import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { CursorPaginationService } from '@/core/features/pagination/cursor/cursorPagination.service';
import { EmailIdentityListCursorPaginationDefinition } from '@/modules/authentication/applications/pagination/cursor/emailIdentityListCursorPagination.definition';
import { FindEmailIdentityListQuery } from '@/modules/authentication/applications/queries/findEmailIdentityList/findEmailIdentityList.query';

import type { IService } from '@/core/interfaces/service.interface';
import type { IListResult } from '@/core/types/list/listResult.type';
import type { IEmailIdentityListCursor } from '@/modules/authentication/domain/types/emailIdentityListCursor.type';
import type { ISelectEmailIdentity } from '@/modules/authentication/infrastructure/schemas/emailIdentity.schema';

interface IInput {
    limit: number;
    cursor: string | null;
}

@Injectable()
export class FindEmailIdentityListService implements IService<
    IInput,
    IListResult<ISelectEmailIdentity, string>
> {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly cursorPaginationService: CursorPaginationService,
        private readonly emailIdentityListCursorPaginationDefinition: EmailIdentityListCursorPaginationDefinition,
    ) {}

    async execute(input: IInput): Promise<IListResult<ISelectEmailIdentity, string>> {
        const emailIdentities = await this.queryBus.execute<
            FindEmailIdentityListQuery,
            ISelectEmailIdentity[]
        >(
            new FindEmailIdentityListQuery({
                limit: input.limit,
                cursor: this.parseCursor(input.cursor),
            }),
        );

        return this.cursorPaginationService.paginate(
            emailIdentities,
            input.limit,
            this.emailIdentityListCursorPaginationDefinition,
        );
    }

    private parseCursor(cursor: string | null): IEmailIdentityListCursor | null {
        try {
            return this.cursorPaginationService.decode(
                cursor,
                this.emailIdentityListCursorPaginationDefinition,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
