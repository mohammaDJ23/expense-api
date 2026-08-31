import { Body, Controller, Get, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';

import { GoogleAuthGuard } from '@/core/features/authentication/googleAuth.guard';
import { OauthCurrentUser } from '@/core/features/oauthCurrentUser/oauthCurrentUser.decorator';
import { HttpResponse } from '@/core/features/responses/http/httpResponse.decorator';
import { AuthenticationService } from '@/modules/authentication/applications/services/authentication.service';
import { LocalForgotPasswordRequestDto } from '@/modules/authentication/interface/dtos/localForgotPassword.request.dto';
import { LocalLoginRequestDto } from '@/modules/authentication/interface/dtos/localLogin.request.dto';
import { LocalResetPasswordRequestDto } from '@/modules/authentication/interface/dtos/localResetPassword.request.dto';
import { LocalSignupRequestDto } from '@/modules/authentication/interface/dtos/localSignup.request.dto';
import { LocalSignupInitiationRequestDto } from '@/modules/authentication/interface/dtos/localSignupInitiation.request.dto';

import {
    SUCCESS_LOCAL_SIGNUP_MESSAGE,
    SUCCESS_LOCAL_LOGIN_MESSAGE,
    SUCCESS_LOCAL_FORGOT_PASSWORD_MESSAGE,
    SUCCESS_LOCAL_RESET_PASSWORD_MESSAGE,
    SUCCESS_LOCAL_SIGNUP_INITIATION_MESSAGE,
} from './v1.constants';

import type { IOauthCurrentUser } from '@/core/features/oauthCurrentUser/oauthCurrentUser.type';
import type { Response } from 'express';

@Controller({ version: '1', path: 'api/authentication' })
export class AuthenticationController {
    constructor(private readonly authenticationService: AuthenticationService) {}

    @Post('local/signup/initiation')
    @Throttle({ default: { limit: 3, ttl: 60000 } })
    @HttpResponse(SUCCESS_LOCAL_SIGNUP_INITIATION_MESSAGE, HttpStatus.OK)
    localSignupInitiation(@Body() body: LocalSignupInitiationRequestDto): Promise<boolean> {
        return this.authenticationService.localSignupInitiation(body);
    }

    @Post('local/signup')
    @Throttle({ default: { limit: 3, ttl: 60000 } })
    @HttpResponse(SUCCESS_LOCAL_SIGNUP_MESSAGE, HttpStatus.CREATED)
    localSignup(@Body() body: LocalSignupRequestDto): Promise<boolean> {
        return this.authenticationService.localSignup(body);
    }

    @Post('local/login')
    @Throttle({ default: { limit: 3, ttl: 60000 } })
    @HttpResponse(SUCCESS_LOCAL_LOGIN_MESSAGE, HttpStatus.OK)
    localLogin(
        @Res({ passthrough: true }) response: Response,
        @Body() body: LocalLoginRequestDto,
    ): Promise<boolean> {
        return this.authenticationService.localLogin(response, body);
    }

    @Post('local/forgot-password')
    @Throttle({ default: { limit: 2, ttl: 300000 } })
    @HttpResponse(SUCCESS_LOCAL_FORGOT_PASSWORD_MESSAGE, HttpStatus.OK)
    localForgotPassword(@Body() body: LocalForgotPasswordRequestDto): Promise<boolean> {
        return this.authenticationService.localForgotPassword(body);
    }

    @Post('local/reset-password')
    @Throttle({ default: { limit: 2, ttl: 300000 } })
    @HttpResponse(SUCCESS_LOCAL_RESET_PASSWORD_MESSAGE, HttpStatus.OK)
    localResetPassword(@Body() body: LocalResetPasswordRequestDto): Promise<boolean> {
        return this.authenticationService.localResetPassword(body);
    }

    @Get('google')
    @Throttle({ default: { limit: 3, ttl: 60000 } })
    @UseGuards(GoogleAuthGuard)
    google(): void {}

    @Get('google/callback')
    @Throttle({ default: { limit: 3, ttl: 60000 } })
    @UseGuards(GoogleAuthGuard)
    @HttpResponse(SUCCESS_LOCAL_LOGIN_MESSAGE, HttpStatus.OK)
    googleLogin(
        @Res({ passthrough: true }) response: Response,
        @OauthCurrentUser() user: IOauthCurrentUser,
    ): Promise<boolean> {
        return this.authenticationService.oauthLogin(response, user);
    }
}
