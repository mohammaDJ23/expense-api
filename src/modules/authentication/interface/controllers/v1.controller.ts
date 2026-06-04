import { Body, Controller, HttpStatus, Post, Query } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';

import { Response } from '@/core/decorators/Response.decorator';
import { AuthenticationService } from '@/modules/authentication/applications/services/authentication.service';
import {
    SUCCESS_SIGNUP_MESSAGE,
    SUCCESS_SEND_EMAIL_VERIFICATION_TOKEN_MESSAGE,
    SUCCESS_VERIFY_EMAIL_VERIFICATION_TOKEN_MESSAGE,
} from '@/modules/authentication/interface/constants/messages.constant';
import { EmailVerificationTokenDto } from '@/modules/authentication/interface/dtos/emailVerificationToken.dto';
import { EmailVerificationTokenVerifyingDto } from '@/modules/authentication/interface/dtos/emailVerificationTokenVerifying.dto';
import { SignupDto } from '@/modules/authentication/interface/dtos/signup.dto';

import type { TInsertUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Controller({ version: '1', path: 'api/authentication' })
export class AuthenticationController {
    constructor(private readonly authenticationService: AuthenticationService) {}

    @Post('signup')
    @Throttle({ default: { limit: 3, ttl: 60000 } })
    @Response(SUCCESS_SIGNUP_MESSAGE, HttpStatus.CREATED)
    signup(@Body() body: SignupDto): Promise<TInsertUser> {
        return this.authenticationService.signup(body);
    }

    @Post('send-email-verification-token')
    @Throttle({ default: { limit: 1, ttl: 300000 } })
    @Response(SUCCESS_SEND_EMAIL_VERIFICATION_TOKEN_MESSAGE, HttpStatus.OK)
    sendEmailVerificationToken(@Body() body: EmailVerificationTokenDto): Promise<boolean> {
        return this.authenticationService.sendEmailVerificationToken(body);
    }

    @Post('verify-email-verification-token')
    @Throttle({ default: { limit: 1, ttl: 300000 } })
    @Response(SUCCESS_VERIFY_EMAIL_VERIFICATION_TOKEN_MESSAGE, HttpStatus.OK)
    verifyEmailVerificationToken(
        @Query() query: EmailVerificationTokenVerifyingDto,
    ): Promise<boolean> {
        return this.authenticationService.verifyEmailVerificationToken(query);
    }
}
