import { Module } from '@nestjs/common';

import { SignupHandler } from '@/modules/authentication/applications/commands/signup/signup.handler';
import { UserModule } from '@/modules/user/user.module';

@Module({
    imports: [UserModule],
    providers: [SignupHandler],
})
export class AuthenticationModule {}
