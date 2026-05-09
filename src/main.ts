import { NestFactory } from '@nestjs/core';

import { PORT } from '@/common/constants/app.constant';
import { ApiVersioningService } from '@/infrastructure/apiVersioning/apiVersioning.service';
import { AppInstanceService } from '@/infrastructure/appInstance/appInstance.service';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { bufferLogs: true });

    app.get(AppInstanceService).set(app);
    app.get(ApiVersioningService).set();

    await app.listen(process.env.PORT ?? PORT);
}
bootstrap();
