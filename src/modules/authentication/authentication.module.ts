import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthenticationService } from '@/modules/authentication/applications/services/authentication.service';
import { AuthenticationController } from '@/modules/authentication/interface/controllers/v1.controller';
import { UserModule } from '@/modules/user/user.module';

@Module({
    imports: [UserModule, CqrsModule],
    controllers: [AuthenticationController],
    providers: [AuthenticationService],
})
export class AuthenticationModule {}
