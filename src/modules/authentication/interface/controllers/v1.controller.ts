import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';

import { Response } from '@/core/decorators/response.decorator';
import { SerializeObjectInterceptor } from '@/core/decorators/serializeObjectInterceptor.decorator';
import { AuthenticationService } from '@/modules/authentication/applications/services/authentication.service';
import {
    SUCCESS_SIGNUP_MESSAGE,
    SUCCESS_SEND_VERIFICATION_MESSAGE,
    SUCCESS_VERIFY_VERIFICATION_MESSAGE,
    SUCCESS_LOGIN_MESSAGE,
    SUCCESS_FORGOT_PASSWORD_MESSAGE,
    SUCCESS_RESET_PASSWORD_MESSAGE,
} from '@/modules/authentication/interface/constants/messages.constant';
import { ForgotPasswordRequestDto } from '@/modules/authentication/interface/dtos/forgotPassword.request.dto';
import { LoginRequestDto } from '@/modules/authentication/interface/dtos/login.request.dto';
import { LoginResponseDto } from '@/modules/authentication/interface/dtos/login.response.dto';
import { ResetPasswordRequestDto } from '@/modules/authentication/interface/dtos/resetPassword.request.dto';
import { SendVerificationRequestDto } from '@/modules/authentication/interface/dtos/sendVerification.request.dto';
import { SignupRequestDto } from '@/modules/authentication/interface/dtos/signup.request.dto';
import { SignupResponseDto } from '@/modules/authentication/interface/dtos/signup.response.dto';
import { VerifyVerificationRequestDto } from '@/modules/authentication/interface/dtos/verifyVerification.request.dto';

import type { AccessTokenEntity } from '@/modules/authentication/domain/entities/accessToken.entity';
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

    @Post('login')
    @Throttle({ default: { limit: 3, ttl: 60000 } })
    @Response(SUCCESS_LOGIN_MESSAGE, HttpStatus.OK)
    @SerializeObjectInterceptor(LoginResponseDto)
    login(@Body() body: LoginRequestDto): Promise<AccessTokenEntity> {
        return this.authenticationService.login(body);
    }

    @Post('verification/send')
    @Throttle({ default: { limit: 2, ttl: 300000 } })
    @Response(SUCCESS_SEND_VERIFICATION_MESSAGE, HttpStatus.OK)
    sendVerification(@Body() body: SendVerificationRequestDto): Promise<boolean> {
        return this.authenticationService.sendVerification(body);
    }

    @Post('verification/verify')
    @Throttle({ default: { limit: 2, ttl: 300000 } })
    @Response(SUCCESS_VERIFY_VERIFICATION_MESSAGE, HttpStatus.OK)
    verifyVerification(@Body() body: VerifyVerificationRequestDto): Promise<boolean> {
        return this.authenticationService.verifyVerification(body);
    }

    @Post('forgot-password')
    @Throttle({ default: { limit: 2, ttl: 300000 } })
    @Response(SUCCESS_FORGOT_PASSWORD_MESSAGE, HttpStatus.OK)
    forgotPassword(@Body() body: ForgotPasswordRequestDto): Promise<boolean> {
        return this.authenticationService.forgotPassword(body);
    }

    @Post('reset-password')
    @Throttle({ default: { limit: 2, ttl: 300000 } })
    @Response(SUCCESS_RESET_PASSWORD_MESSAGE, HttpStatus.OK)
    resetPassword(@Body() body: ResetPasswordRequestDto): Promise<boolean> {
        return this.authenticationService.resetPassword(body);
    }
}
