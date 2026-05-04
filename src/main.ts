import { NestFactory } from '@nestjs/core';

import { PORT } from '@/common/constants/app.constant';
import { ApiVersioningService } from '@/common/infrastructure/apiVersioning/apiVersioning.service';
import { AppInstanceService } from '@/common/infrastructure/appInstance/appInstance.service';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { bufferLogs: true });

    app.get(AppInstanceService).set(app);
    app.get(ApiVersioningService).setApiVersioning();

    await app.listen(process.env.PORT ?? PORT);
}
bootstrap();
