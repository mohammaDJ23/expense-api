import { Module } from '@nestjs/common';

import { ErrorExceptionNormalizerStrategy } from './errorExceptionNormalizer.strategy';
import { ExceptionNormalizerService } from './exceptionNormalizer.service';
import { FallbackExceptionNormalizerStrategy } from './fallbackExceptionNormalizer.strategy';
import { HttpExceptionNormalizerStrategy } from './httpExceptionNormalizer.strategy';
import { ObjectExceptionNormalizerStrategy } from './objectExceptionNormalizer.strategy';
import { StringExceptionNormalizerStrategy } from './stringExceptionNormalizer.strategy';

@Module({
    providers: [
        ExceptionNormalizerService,
        HttpExceptionNormalizerStrategy,
        ObjectExceptionNormalizerStrategy,
        StringExceptionNormalizerStrategy,
        ErrorExceptionNormalizerStrategy,
        FallbackExceptionNormalizerStrategy,
    ],
    exports: [ExceptionNormalizerService],
})
export class ExceptionNormalizerModule {}
