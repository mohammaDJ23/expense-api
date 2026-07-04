import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';

import { PORT } from '@/common/common.constants';
import { ApiVersioningService } from '@/core/services/apiVersioning.service';
import { AppInstanceService } from '@/core/services/appInstance.service';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { bufferLogs: true });

    app.get(AppInstanceService).set(app);
    app.get(ApiVersioningService).set();
    app.use(cookieParser());

    await app.listen(process.env.PORT ?? PORT);
}
bootstrap();
