import { Body, Controller, Get, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiExtraModels,
    ApiForbiddenResponse,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiTooManyRequestsResponse,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

import { ExceptionDto } from '@/core/features/exceptionNormalizer/exception.dto';
import { OauthCurrentUser } from '@/core/features/oauthCurrentUser/oauthCurrentUser.decorator';
import { HttpResponse } from '@/core/features/responses/http/httpResponse.decorator';
import { HttpResponseDto } from '@/core/features/responses/http/httpResponse.dto';
import { httpBooleanResponseSwaggerSchema } from '@/infrastructure/swagger/schemas/httpBooleanResponse.schema';
import { httpExceptionResponseSwaggerSchema } from '@/infrastructure/swagger/schemas/httpExceptionResponse.schema';
import { AuthenticationService } from '@/modules/authentication/applications/services/authentication.service';
import { LocalAccountCreationRequestDto } from '@/modules/authentication/interface/dtos/localAccountCreation.request.dto';
import { LocalAccountInitiationRequestDto } from '@/modules/authentication/interface/dtos/localAccountInitiation.request.dto';
import { LocalForgotPasswordRequestDto } from '@/modules/authentication/interface/dtos/localForgotPassword.request.dto';
import { LocalLoginRequestDto } from '@/modules/authentication/interface/dtos/localLogin.request.dto';
import { LocalResetPasswordRequestDto } from '@/modules/authentication/interface/dtos/localResetPassword.request.dto';
import { LocalSignupRequestDto } from '@/modules/authentication/interface/dtos/localSignup.request.dto';
import { LocalSignupInitiationRequestDto } from '@/modules/authentication/interface/dtos/localSignupInitiation.request.dto';
import { GoogleAuthGuard } from '@/modules/authentication/interface/oauth/google/googleAuth.guard';

import {
    SUCCESS_LOCAL_SIGNUP_MESSAGE,
    SUCCESS_LOCAL_LOGIN_MESSAGE,
    SUCCESS_LOCAL_FORGOT_PASSWORD_MESSAGE,
    SUCCESS_LOCAL_RESET_PASSWORD_MESSAGE,
    SUCCESS_LOCAL_SIGNUP_INITIATION_MESSAGE,
    SUCCESS_LOCAL_ACCOUNT_INITIATION,
    SUCCESS_LOCAL_ACCOUNT_CREATION,
} from './v1.constants';

import type { IOauthCurrentUser } from '@/core/features/oauthCurrentUser/oauthCurrentUser.type';
import type { Response } from 'express';

@ApiTags('Authentication')
@Controller({ version: '1', path: 'api/authentication' })
export class AuthenticationController {
    constructor(private readonly authenticationService: AuthenticationService) {}

    @Post('local/signup/initiation')
    @Throttle({ default: { limit: 3, ttl: 60000 } })
    @HttpResponse(SUCCESS_LOCAL_SIGNUP_INITIATION_MESSAGE, HttpStatus.OK)
    @ApiOperation({
        summary: 'Local signup initialization',
        description: 'Send a token for the initiation of an account',
        operationId: 'localSignupInitiation',
    })
    @ApiExtraModels(HttpResponseDto, ExceptionDto)
    @ApiOkResponse({ schema: httpBooleanResponseSwaggerSchema() })
    @ApiInternalServerErrorResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiConflictResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiNotFoundResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiTooManyRequestsResponse({ schema: httpExceptionResponseSwaggerSchema() })
    localSignupInitiation(@Body() body: LocalSignupInitiationRequestDto): Promise<boolean> {
        return this.authenticationService.localSignupInitiation(body);
    }

    @Post('local/signup')
    @Throttle({ default: { limit: 3, ttl: 60000 } })
    @HttpResponse(SUCCESS_LOCAL_SIGNUP_MESSAGE, HttpStatus.CREATED)
    @ApiOperation({
        summary: 'Local signup',
        description: 'Create a new local account after the initiation',
        operationId: 'localSignup',
    })
    @ApiExtraModels(HttpResponseDto, ExceptionDto)
    @ApiCreatedResponse({ schema: httpBooleanResponseSwaggerSchema() })
    @ApiInternalServerErrorResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiConflictResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiNotFoundResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiBadRequestResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiTooManyRequestsResponse({ schema: httpExceptionResponseSwaggerSchema() })
    localSignup(@Body() body: LocalSignupRequestDto): Promise<boolean> {
        return this.authenticationService.localSignup(body);
    }

    @Post('local/login')
    @Throttle({ default: { limit: 3, ttl: 60000 } })
    @HttpResponse(SUCCESS_LOCAL_LOGIN_MESSAGE, HttpStatus.OK)
    @ApiOperation({
        summary: 'Local login',
        description: 'Enter to app with the local login',
        operationId: 'localLogin',
    })
    @ApiExtraModels(HttpResponseDto, ExceptionDto)
    @ApiOkResponse({ schema: httpBooleanResponseSwaggerSchema() })
    @ApiInternalServerErrorResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiBadRequestResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiNotFoundResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiForbiddenResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiTooManyRequestsResponse({ schema: httpExceptionResponseSwaggerSchema() })
    localLogin(
        @Res({ passthrough: true }) response: Response,
        @Body() body: LocalLoginRequestDto,
    ): Promise<boolean> {
        return this.authenticationService.localLogin(response, body);
    }

    @Post('local/forgot-password')
    @Throttle({ default: { limit: 2, ttl: 300000 } })
    @HttpResponse(SUCCESS_LOCAL_FORGOT_PASSWORD_MESSAGE, HttpStatus.OK)
    @ApiOperation({
        summary: 'Local forgot password',
        description: 'Send a token for the process of resetting a password',
        operationId: 'localForgotPassword',
    })
    @ApiExtraModels(HttpResponseDto, ExceptionDto)
    @ApiOkResponse({ schema: httpBooleanResponseSwaggerSchema() })
    @ApiInternalServerErrorResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiBadRequestResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiNotFoundResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiTooManyRequestsResponse({ schema: httpExceptionResponseSwaggerSchema() })
    localForgotPassword(@Body() body: LocalForgotPasswordRequestDto): Promise<boolean> {
        return this.authenticationService.localForgotPassword(body);
    }

    @Post('local/reset-password')
    @Throttle({ default: { limit: 2, ttl: 300000 } })
    @HttpResponse(SUCCESS_LOCAL_RESET_PASSWORD_MESSAGE, HttpStatus.OK)
    @ApiOperation({
        summary: 'Local reset password',
        description: 'Reset the password',
        operationId: 'localResetPassword',
    })
    @ApiExtraModels(HttpResponseDto, ExceptionDto)
    @ApiOkResponse({ schema: httpBooleanResponseSwaggerSchema() })
    @ApiInternalServerErrorResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiBadRequestResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiNotFoundResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiTooManyRequestsResponse({ schema: httpExceptionResponseSwaggerSchema() })
    localResetPassword(@Body() body: LocalResetPasswordRequestDto): Promise<boolean> {
        return this.authenticationService.localResetPassword(body);
    }

    @Post('local/account/initiation')
    @Throttle({ default: { limit: 2, ttl: 300000 } })
    @HttpResponse(SUCCESS_LOCAL_ACCOUNT_INITIATION, HttpStatus.OK)
    @ApiOperation({
        summary: 'Local account initiation',
        description: 'Send a token for initiation of a local account',
        operationId: 'localAccountInitiation',
    })
    @ApiExtraModels(HttpResponseDto, ExceptionDto)
    @ApiOkResponse({ schema: httpBooleanResponseSwaggerSchema() })
    @ApiInternalServerErrorResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiBadRequestResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiNotFoundResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiTooManyRequestsResponse({ schema: httpExceptionResponseSwaggerSchema() })
    localAccountInitiation(@Body() body: LocalAccountInitiationRequestDto): Promise<boolean> {
        return this.authenticationService.localAccountInitiation(body);
    }

    @Post('local/account')
    @Throttle({ default: { limit: 2, ttl: 300000 } })
    @HttpResponse(SUCCESS_LOCAL_ACCOUNT_CREATION, HttpStatus.CREATED)
    @ApiOperation({
        summary: 'Local account creation',
        description: 'Create a local account',
        operationId: 'localAccountCreation',
    })
    @ApiExtraModels(HttpResponseDto, ExceptionDto)
    @ApiCreatedResponse({ schema: httpBooleanResponseSwaggerSchema() })
    @ApiInternalServerErrorResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiBadRequestResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiNotFoundResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiTooManyRequestsResponse({ schema: httpExceptionResponseSwaggerSchema() })
    localAccountCreation(@Body() body: LocalAccountCreationRequestDto): Promise<boolean> {
        return this.authenticationService.localAccountCreation(body);
    }

    @Get('google')
    @Throttle({ default: { limit: 3, ttl: 60000 } })
    @UseGuards(GoogleAuthGuard)
    @ApiOperation({
        summary: 'Google login or signup',
        description: 'Create or login a google account',
        operationId: 'google',
    })
    @ApiTooManyRequestsResponse({ schema: httpExceptionResponseSwaggerSchema() })
    google(): void {}

    @Get('google/callback')
    @Throttle({ default: { limit: 3, ttl: 60000 } })
    @UseGuards(GoogleAuthGuard)
    @HttpResponse(SUCCESS_LOCAL_LOGIN_MESSAGE, HttpStatus.OK)
    @ApiOperation({
        summary: 'Google callback',
        description: 'This is the callback of google login',
        operationId: 'googleLogin',
    })
    @ApiExtraModels(HttpResponseDto, ExceptionDto)
    @ApiOkResponse({ schema: httpBooleanResponseSwaggerSchema() })
    @ApiInternalServerErrorResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiBadRequestResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiNotFoundResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiUnauthorizedResponse({ schema: httpExceptionResponseSwaggerSchema() })
    @ApiTooManyRequestsResponse({ schema: httpExceptionResponseSwaggerSchema() })
    googleLogin(
        @Res({ passthrough: true }) response: Response,
        @OauthCurrentUser() user: IOauthCurrentUser,
    ): Promise<boolean> {
        return this.authenticationService.oauthLogin(response, user);
    }
}
