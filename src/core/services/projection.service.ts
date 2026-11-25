import { Injectable } from '@nestjs/common';

import { IService } from '@/core/interfaces/service.interface';

@Injectable()
export class ProjectionService implements IService<Promise<void>[], void> {
    async execute(input: Promise<void>[]): Promise<void> {
        try {
            const results = await Promise.allSettled(input);

            results.forEach((result, index) => {
                if (result.status === 'rejected') {
                    console.error({
                        projection: index,
                        error: result.reason,
                    });
                }
            });
        } catch (error) {
            console.error(error);
        }
    }
}
