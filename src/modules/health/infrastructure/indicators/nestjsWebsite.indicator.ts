import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import { HealthEntity } from '@/modules/health/domain/entities/health.entity';
import { NESTJS_WEBSITE_NAME } from '@/modules/health/infrastructure/constants/nestjsWebsite.constants';

import type { IHealthIndicator } from '@/modules/health/domain/interfaces/healthIndicator.interface';
import type { HealthIndicatorResult } from '@nestjs/terminus';

@Injectable()
export class NestJsWebsiteIndicator implements IHealthIndicator {
    constructor(private readonly httpService: HttpService) {}

    async check(): Promise<HealthIndicatorResult> {
        try {
            const response = await firstValueFrom(
                this.httpService.request({
                    url: 'https://nestjs.com',
                    method: 'GET',
                    timeout: 10000,
                }),
            );

            if (response.status >= 200 && response.status < 300) {
                return HealthEntity.up(NESTJS_WEBSITE_NAME).toJSON();
            }

            return HealthEntity.down(NESTJS_WEBSITE_NAME).toJSON();
        } catch (error) {
            return HealthEntity.down(NESTJS_WEBSITE_NAME, { error }).toJSON();
        }
    }
}
