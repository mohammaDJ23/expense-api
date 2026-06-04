import { Body, Controller, HttpStatus, Post, Query } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';

import { Response } from '@/core/decorators/Response.decorator';
import { AuthenticationService } from '@/modules/authentication/applications/services/authentication.service';
import {
    SUCCESS_SIGNUP_MESSAGE,
    SUCCESS_SEND_VERIFICATION_MESSAGE,
    SUCCESS_VERIFY_VERIFICATION_MESSAGE,
} from '@/modules/authentication/interface/constants/messages.constant';
import { SendVerificationDto } from '@/modules/authentication/interface/dtos/sendVerification.dto';
import { SignupDto } from '@/modules/authentication/interface/dtos/signup.dto';
import { VerifyVerificationDto } from '@/modules/authentication/interface/dtos/verifyVerification.dto';

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

    @Post('send-verification')
    @Throttle({ default: { limit: 1, ttl: 300000 } })
    @Response(SUCCESS_SEND_VERIFICATION_MESSAGE, HttpStatus.OK)
    sendVerification(@Body() body: SendVerificationDto): Promise<boolean> {
        return this.authenticationService.sendVerification(body);
    }

    @Post('verify-verification')
    @Throttle({ default: { limit: 1, ttl: 300000 } })
    @Response(SUCCESS_VERIFY_VERIFICATION_MESSAGE, HttpStatus.OK)
    verifyVerification(@Query() query: VerifyVerificationDto): Promise<boolean> {
        return this.authenticationService.verifyVerification(query);
    }
}
