import { Body, Controller, Get, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';

import { CurrentUser } from '@/core/decorators/currentUser.decorator';
import { Response } from '@/core/decorators/response.decorator';
import { SerializeObjectInterceptor } from '@/core/decorators/serializeObjectInterceptor.decorator';
import { GoogleAuthGuard } from '@/core/guards/googleAuth.guard';
import { GoogleService } from '@/modules/authentication/applications/services/google.service';
import { LoginService } from '@/modules/authentication/applications/services/login.service';
import { PasswordService } from '@/modules/authentication/applications/services/password.service';
import { SignupService } from '@/modules/authentication/applications/services/signup.service';
import { VerificationService } from '@/modules/authentication/applications/services/verification.service';
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

import type { ICurrentUser } from '@/core/interfaces/currentUser.interface';
import type { AccessTokenEntity } from '@/modules/authentication/domain/entities/accessToken.entity';
import type { TInsertUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Controller({ version: '1', path: 'api/authentication' })
export class AuthenticationController {
    // eslint-disable-next-line max-params
    constructor(
        private readonly signupService: SignupService,
        private readonly loginService: LoginService,
        private readonly verificationService: VerificationService,
        private readonly passwordService: PasswordService,
        private readonly googleService: GoogleService,
    ) {}

    @Post('signup')
    @Throttle({ default: { limit: 3, ttl: 60000 } })
    @Response(SUCCESS_SIGNUP_MESSAGE, HttpStatus.CREATED)
    @SerializeObjectInterceptor(SignupResponseDto)
    signup(@Body() body: SignupRequestDto): Promise<TInsertUser> {
        return this.signupService.signup(body);
    }

    @Post('login')
    @Throttle({ default: { limit: 3, ttl: 60000 } })
    @Response(SUCCESS_LOGIN_MESSAGE, HttpStatus.OK)
    @SerializeObjectInterceptor(LoginResponseDto)
    login(@Body() body: LoginRequestDto): Promise<AccessTokenEntity> {
        return this.loginService.login(body);
    }

    @Post('verification/send')
    @Throttle({ default: { limit: 2, ttl: 300000 } })
    @Response(SUCCESS_SEND_VERIFICATION_MESSAGE, HttpStatus.OK)
    sendVerification(@Body() body: SendVerificationRequestDto): Promise<boolean> {
        return this.verificationService.sendVerification(body);
    }

    @Post('verification/verify')
    @Throttle({ default: { limit: 2, ttl: 300000 } })
    @Response(SUCCESS_VERIFY_VERIFICATION_MESSAGE, HttpStatus.OK)
    verifyVerification(@Body() body: VerifyVerificationRequestDto): Promise<boolean> {
        return this.verificationService.verifyVerification(body);
    }

    @Post('forgot-password')
    @Throttle({ default: { limit: 2, ttl: 300000 } })
    @Response(SUCCESS_FORGOT_PASSWORD_MESSAGE, HttpStatus.OK)
    forgotPassword(@Body() body: ForgotPasswordRequestDto): Promise<boolean> {
        return this.passwordService.forgotPassword(body);
    }

    @Post('reset-password')
    @Throttle({ default: { limit: 2, ttl: 300000 } })
    @Response(SUCCESS_RESET_PASSWORD_MESSAGE, HttpStatus.OK)
    resetPassword(@Body() body: ResetPasswordRequestDto): Promise<boolean> {
        return this.passwordService.resetPassword(body);
    }

    @Get('google')
    @Throttle({ default: { limit: 3, ttl: 60000 } })
    @UseGuards(GoogleAuthGuard)
    // eslint-disable-next-line no-empty-function, @typescript-eslint/no-empty-function
    googleAuth(): void {}

    @Get('google/callback')
    @Throttle({ default: { limit: 3, ttl: 60000 } })
    @UseGuards(GoogleAuthGuard)
    @Response(SUCCESS_LOGIN_MESSAGE, HttpStatus.OK)
    @SerializeObjectInterceptor(LoginResponseDto)
    googleRedirect(@CurrentUser() user: ICurrentUser): AccessTokenEntity {
        return this.googleService.sign(user);
    }
}
