import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { HealthIndicatorResult } from '@nestjs/terminus';

import { firstValueFrom } from 'rxjs';

import { NESTJS_WEBSITE_NAME } from 'src/common/constants';

import { HealthEntity } from '../../domain/entities/health.entity';
import { IHealthIndicator } from '../../domain/interfaces/healthIndicator.interface';

@Injectable()
export class NestJsWebsiteIndicator implements IHealthIndicator {
    constructor(private readonly httpService: HttpService) {}

    async check(): Promise<HealthIndicatorResult> {
        try {
            const response = await firstValueFrom(
                this.httpService.request({
                    url: 'https://nestjs.com',
                    method: 'GET',
                    timeout: 3000,
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
