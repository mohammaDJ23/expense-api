import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';

import { Response } from '@/core/decorators/Response.decorator';
import { AuthenticationService } from '@/modules/authentication/applications/services/authentication.service';
import {
    SUCCESS_EMAIL_VERIFICATION_TOKEN_MESSAGE,
    SUCCESS_SIGNUP_MESSAGE,
} from '@/modules/authentication/interface/constants/messages.constant';
import { EmailVerificationTokenDto } from '@/modules/authentication/interface/dtos/emailVerificationToken.dto';
import { SignupDto } from '@/modules/authentication/interface/dtos/signup.dto';

import type { TRequiredInsertUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Controller({ version: '1', path: 'api/authentication' })
export class AuthenticationController {
    constructor(private readonly authenticationService: AuthenticationService) {}

    @Post('signup')
    @Throttle({ default: { limit: 3, ttl: 60000 } })
    @Response(SUCCESS_SIGNUP_MESSAGE, HttpStatus.CREATED)
    signup(@Body() body: SignupDto): Promise<TRequiredInsertUser> {
        return this.authenticationService.signup(body);
    }

    @Post('send-email-verification-token')
    @Throttle({ default: { limit: 2, ttl: 60000 } })
    @Response(SUCCESS_EMAIL_VERIFICATION_TOKEN_MESSAGE, HttpStatus.OK)
    sendEmailVerificationToken(@Body() body: EmailVerificationTokenDto): Promise<boolean> {
        return this.authenticationService.sendEmailVerificationToken(body);
    }
}
