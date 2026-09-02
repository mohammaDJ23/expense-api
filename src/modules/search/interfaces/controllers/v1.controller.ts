import { Controller, Get, HttpStatus, Post, Query, UseGuards } from '@nestjs/common';

import { CurrentUser } from '@/core/features/currentUser/currentUser.decorator';
import { JwtAuthGuard } from '@/core/features/jwt/jwtAuth.guard';
import { HttpResponse } from '@/core/features/responses/http/httpResponse.decorator';
import { SerializerInterceptor } from '@/core/features/serializer/serializerInterceptor.decorator';
import { SearchService } from '@/modules/search/applications/services/search.service';
import { SearchRequestDto } from '@/modules/search/interfaces/dtos/search.request.dto';
import { SearchResponseDto } from '@/modules/search/interfaces/dtos/search.response.dto';

import { SUCCESS_SEARCH_SYNC_MESSAGE, SUCCESS_SEARCH_QUERY_MESSAGE } from './v1.constants';

import type { ICurrentUser } from '@/core/features/currentUser/currentUser.type';
import type { ISearch } from '@/modules/search/domain/types/search.type';

@Controller({ version: '1', path: 'api/search' })
export class SearchController {
    constructor(private readonly searchService: SearchService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    @SerializerInterceptor(SearchResponseDto)
    @HttpResponse(SUCCESS_SEARCH_QUERY_MESSAGE, HttpStatus.OK)
    searchQuery(
        @CurrentUser() user: ICurrentUser,
        @Query() query: SearchRequestDto,
    ): Promise<ISearch> {
        return this.searchService.searchQuery(user.id, query);
    }

    @Post('sync')
    @UseGuards(JwtAuthGuard)
    @HttpResponse(SUCCESS_SEARCH_SYNC_MESSAGE, HttpStatus.OK)
    searchSync(@CurrentUser() user: ICurrentUser): Promise<boolean> {
        return this.searchService.searchSync(user.id);
    }
}
