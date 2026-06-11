import { Global, Module } from '@nestjs/common';
import { ClsPluginTransactional } from '@nestjs-cls/transactional';
import { TransactionalAdapterDrizzleOrm } from '@nestjs-cls/transactional-adapter-drizzle-orm';
import { ClsModule } from 'nestjs-cls';

import { DRIZZLE_CLIENT_TOKEN } from './drizzle.constants';
import { DrizzleClientModule } from './drizzleClient.module';

@Global()
@Module({
    imports: [
        DrizzleClientModule,
        ClsModule.forRoot({
            global: true,
            middleware: {
                mount: true,
                generateId: true,
            },
            plugins: [
                new ClsPluginTransactional({
                    adapter: new TransactionalAdapterDrizzleOrm({
                        drizzleInstanceToken: DRIZZLE_CLIENT_TOKEN,
                    }),
                }),
            ],
        }),
    ],
    exports: [DrizzleClientModule, ClsModule],
})
export class DrizzleModule {}
