import { Injectable, type NestMiddleware } from '@nestjs/common';
import compression from 'compression';

import { LEVEL, THRESHOLD } from './compression.constants';

import type { Request, Response, NextFunction } from 'express';

@Injectable()
export class CompressionMiddleware implements NestMiddleware {
    private readonly compression = compression({
        level: LEVEL,
        threshold: THRESHOLD,
    });

    use(req: Request, res: Response, next: NextFunction): void {
        this.compression(req, res, next);
    }
}
