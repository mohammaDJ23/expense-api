import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { PORT } from './common/constants';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableVersioning({
        type: VersioningType.URI,
        prefix: 'v',
    });

    await app.listen(process.env.PORT ?? PORT);
}
bootstrap();
