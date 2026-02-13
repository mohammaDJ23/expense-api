import { Module } from '@nestjs/common';
import { ConfigModule as CM } from '@nestjs/config';

@Module({
    imports: [CM.forRoot({ isGlobal: true })],
})
export class ConfigModule {}
