import { Module } from '@nestjs/common';
import { ScheduleModule as BaseScheduleModule } from '@nestjs/schedule';

@Module({
    imports: [BaseScheduleModule.forRoot()],
})
export class ScheduleModule {}
