import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';

import { CurrentUser } from '@/core/authentication/currentUser.decorator';
import { JwtAuthGuard } from '@/core/authentication/jwtAuth.guard';
import { HttpResponse } from '@/core/responses/http/httpResponse.decorator';
import { SerializerInterceptor } from '@/core/serializers/serializerInterceptor.decorator';
import { SearchService } from '@/modules/search/applications/services/search.service';
import { SearchRequestDto } from '@/modules/search/interfaces/dtos/search.request.dto';
import { SearchResponseDto } from '@/modules/search/interfaces/dtos/search.response.dto';

import { SUCCESS_SEARCH_MESSAGE } from './controllers.constants';

import type { ICurrentUser } from '@/core/authentication/currentUser.type';
import type { ISearch } from '@/modules/search/domain/interface/search.interface';

@Controller({ version: '1', path: 'api/search' })
export class SearchController {
    constructor(private readonly searchService: SearchService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(SearchResponseDto)
    @HttpResponse(SUCCESS_SEARCH_MESSAGE, HttpStatus.OK)
    search(@CurrentUser() user: ICurrentUser, @Query() query: SearchRequestDto): Promise<ISearch> {
        return this.searchService.execute({ userId: user.id, query });
    }
}
