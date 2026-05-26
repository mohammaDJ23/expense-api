import { Body, Controller, HttpStatus, Post } from '@nestjs/common';

import { Response } from '@/core/decorators/Response.decorator';
import { AuthenticationService } from '@/modules/authentication/applications/services/authentication.service';
import { SUCCESS_SIGNUP_MESSAGE } from '@/modules/authentication/interface/constants/messages.constant';

import type { SignupDto } from '@/modules/authentication/interface/dtos/singup.dto';
import type { UserEntity } from '@/modules/user/domain/entities/user.entity';

@Controller({ version: '1', path: 'api/authentication' })
export class AuthenticationController {
    constructor(private readonly authenticationService: AuthenticationService) {}

    @Post('signup')
    @Response(SUCCESS_SIGNUP_MESSAGE, HttpStatus.CREATED)
    signup(@Body() body: SignupDto): Promise<UserEntity> {
        return this.authenticationService.signup(body);
    }
}
