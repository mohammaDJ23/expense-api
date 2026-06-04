import { Body, Controller, HttpStatus, Post, Query } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';

import { Response } from '@/core/decorators/response.decorator';
import { SerializeObjectInterceptor } from '@/core/decorators/serializeObjectInterceptor.decorator';
import { AuthenticationService } from '@/modules/authentication/applications/services/authentication.service';
import {
    SUCCESS_SIGNUP_MESSAGE,
    SUCCESS_SEND_VERIFICATION_MESSAGE,
    SUCCESS_VERIFY_VERIFICATION_MESSAGE,
} from '@/modules/authentication/interface/constants/messages.constant';
import { SendVerificationRequestDto } from '@/modules/authentication/interface/dtos/sendVerification.request.dto';
import { SignupRequestDto } from '@/modules/authentication/interface/dtos/signup.request.dto';
import { SignupResponseDto } from '@/modules/authentication/interface/dtos/signup.response.dto';
import { VerifyVerificationRequestDto } from '@/modules/authentication/interface/dtos/verifyVerification.request.dto';

import type { TInsertUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Controller({ version: '1', path: 'api/authentication' })
export class AuthenticationController {
    constructor(private readonly authenticationService: AuthenticationService) {}

    @Post('signup')
    @Throttle({ default: { limit: 3, ttl: 60000 } })
    @Response(SUCCESS_SIGNUP_MESSAGE, HttpStatus.CREATED)
    @SerializeObjectInterceptor(SignupResponseDto)
    signup(@Body() body: SignupRequestDto): Promise<TInsertUser> {
        return this.authenticationService.signup(body);
    }

    @Post('send-verification')
    @Throttle({ default: { limit: 1, ttl: 300000 } })
    @Response(SUCCESS_SEND_VERIFICATION_MESSAGE, HttpStatus.OK)
    sendVerification(@Body() body: SendVerificationRequestDto): Promise<boolean> {
        return this.authenticationService.sendVerification(body);
    }

    @Post('verify-verification')
    @Throttle({ default: { limit: 1, ttl: 300000 } })
    @Response(SUCCESS_VERIFY_VERIFICATION_MESSAGE, HttpStatus.OK)
    verifyVerification(@Query() query: VerifyVerificationRequestDto): Promise<boolean> {
        return this.authenticationService.verifyVerification(query);
    }
}
