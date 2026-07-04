import { Injectable, type NestMiddleware } from '@nestjs/common';
import cookieParser from 'cookie-parser';

import type { Request, Response, NextFunction } from 'express';

@Injectable()
export class CookieParserMiddleware implements NestMiddleware {
    private readonly cookieParser = cookieParser();

    use(req: Request, res: Response, next: NextFunction): void {
        this.cookieParser(req, res, next);
    }
}
