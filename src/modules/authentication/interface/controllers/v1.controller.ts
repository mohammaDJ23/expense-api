import { Body, Controller, Get, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';

import { CurrentUser } from '@/core/currentUser/currentUser.decorator';
import { GoogleAuthGuard } from '@/core/google/googleAuth.guard';
import { HttpResponse } from '@/core/httpResponse/httpResponse.decorator';
import { ObjectSerializerInterceptor } from '@/core/serializers/objectSerializerInterceptor.decorator';
import { AuthenticationService } from '@/modules/authentication/applications/services/authentication.service';
import {
    SUCCESS_SIGNUP_MESSAGE,
    SUCCESS_SEND_VERIFICATION_MESSAGE,
    SUCCESS_VERIFY_VERIFICATION_MESSAGE,
    SUCCESS_LOGIN_MESSAGE,
    SUCCESS_FORGOT_PASSWORD_MESSAGE,
    SUCCESS_RESET_PASSWORD_MESSAGE,
} from '@/modules/authentication/interface/constants/messages.constant';
import { LocalForgotPasswordRequestDto } from '@/modules/authentication/interface/dtos/localForgotPassword.request.dto';
import { LocalLoginRequestDto } from '@/modules/authentication/interface/dtos/localLogin.request.dto';
import { LocalResetPasswordRequestDto } from '@/modules/authentication/interface/dtos/localResetPassword.request.dto';
import { LocalSendVerificationRequestDto } from '@/modules/authentication/interface/dtos/localSendVerification.request.dto';
import { LocalSignupRequestDto } from '@/modules/authentication/interface/dtos/localSignup.request.dto';
import { LocalVerifyVerificationRequestDto } from '@/modules/authentication/interface/dtos/localVerifyVerification.request.dto';
import { LoginResponseDto } from '@/modules/authentication/interface/dtos/login.response.dto';

import type { ICurrentUser } from '@/core/currentUser/currentUser.interface';
import type { AccessTokenEntity } from '@/modules/authentication/domain/entities/accessToken.entity';

@Controller({ version: '1', path: 'api/authentication' })
export class AuthenticationController {
    constructor(private readonly authenticationService: AuthenticationService) {}

    @Post('local/signup')
    @Throttle({ default: { limit: 3, ttl: 60000 } })
    @HttpResponse(SUCCESS_SIGNUP_MESSAGE, HttpStatus.CREATED)
    localSignup(@Body() body: LocalSignupRequestDto): Promise<boolean> {
        return this.authenticationService.localSignup(body);
    }

    @Post('local/login')
    @Throttle({ default: { limit: 3, ttl: 60000 } })
    @HttpResponse(SUCCESS_LOGIN_MESSAGE, HttpStatus.OK)
    @ObjectSerializerInterceptor(LoginResponseDto)
    localLogin(@Body() body: LocalLoginRequestDto): Promise<AccessTokenEntity> {
        return this.authenticationService.localLogin(body);
    }

    @Post('local/verification/send')
    @Throttle({ default: { limit: 2, ttl: 300000 } })
    @HttpResponse(SUCCESS_SEND_VERIFICATION_MESSAGE, HttpStatus.OK)
    localSendVerification(@Body() body: LocalSendVerificationRequestDto): Promise<boolean> {
        return this.authenticationService.localSendVerification(body);
    }

    @Post('local/verification/verify')
    @Throttle({ default: { limit: 2, ttl: 300000 } })
    @HttpResponse(SUCCESS_VERIFY_VERIFICATION_MESSAGE, HttpStatus.OK)
    localVerifyVerification(@Body() body: LocalVerifyVerificationRequestDto): Promise<boolean> {
        return this.authenticationService.localVerifyVerification(body);
    }

    @Post('local/forgot-password')
    @Throttle({ default: { limit: 2, ttl: 300000 } })
    @HttpResponse(SUCCESS_FORGOT_PASSWORD_MESSAGE, HttpStatus.OK)
    localForgotPassword(@Body() body: LocalForgotPasswordRequestDto): Promise<boolean> {
        return this.authenticationService.localForgotPassword(body);
    }

    @Post('local/reset-password')
    @Throttle({ default: { limit: 2, ttl: 300000 } })
    @HttpResponse(SUCCESS_RESET_PASSWORD_MESSAGE, HttpStatus.OK)
    localResetPassword(@Body() body: LocalResetPasswordRequestDto): Promise<boolean> {
        return this.authenticationService.localResetPassword(body);
    }

    @Get('google')
    @Throttle({ default: { limit: 3, ttl: 60000 } })
    @UseGuards(GoogleAuthGuard)
    // eslint-disable-next-line no-empty-function, @typescript-eslint/no-empty-function
    google(): void {}

    @Get('google/callback')
    @Throttle({ default: { limit: 3, ttl: 60000 } })
    @UseGuards(GoogleAuthGuard)
    @HttpResponse(SUCCESS_LOGIN_MESSAGE, HttpStatus.OK)
    @ObjectSerializerInterceptor(LoginResponseDto)
    googleLogin(@CurrentUser() user: ICurrentUser): AccessTokenEntity {
        return this.authenticationService.googleLogin(user);
    }
}
