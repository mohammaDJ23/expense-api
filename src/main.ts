import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { PORT } from '@/common/constants/app.constants';
import { AppInstanceService } from '@/common/infrastructure/appInstance/appInstance.service';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { bufferLogs: true });

    app.get(AppInstanceService).setApp(app);

    app.enableVersioning({
        type: VersioningType.URI,
        prefix: 'v',
    });

    await app.listen(process.env.PORT ?? PORT);
}
bootstrap();
