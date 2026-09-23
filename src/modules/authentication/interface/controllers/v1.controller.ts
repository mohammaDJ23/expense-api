import {
    BadRequestException,
    Body,
    ConflictException,
    Controller,
    ForbiddenException,
    Get,
    HttpStatus,
    InternalServerErrorException,
    NotFoundException,
    Post,
    Res,
    UnauthorizedException,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiExcludeEndpoint,
    ApiForbiddenResponse,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

import { OauthCurrentUser } from '@/core/features/oauthCurrentUser/oauthCurrentUser.decorator';
import { HttpResponse } from '@/core/features/responses/http/httpResponse.decorator';
import { HttpResponseEntity } from '@/core/features/responses/http/httpResponse.entity';
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
        description: 'Send a token for the initiation of an account',
        operationId: 'localSignupInitiation',
    })
    @ApiOkResponse({ type: HttpResponseEntity<boolean> })
    @ApiInternalServerErrorResponse({ type: HttpResponseEntity<InternalServerErrorException> })
    @ApiConflictResponse({ type: HttpResponseEntity<ConflictException> })
    @ApiNotFoundResponse({ type: HttpResponseEntity<NotFoundException> })
    localSignupInitiation(@Body() body: LocalSignupInitiationRequestDto): Promise<boolean> {
        return this.authenticationService.localSignupInitiation(body);
    }

    @Post('local/signup')
    @Throttle({ default: { limit: 3, ttl: 60000 } })
    @HttpResponse(SUCCESS_LOCAL_SIGNUP_MESSAGE, HttpStatus.CREATED)
    @ApiOperation({ description: 'Create a new local account', operationId: 'localSignup' })
    @ApiCreatedResponse({ type: HttpResponseEntity<boolean> })
    @ApiInternalServerErrorResponse({ type: HttpResponseEntity<InternalServerErrorException> })
    @ApiBadRequestResponse({ type: HttpResponseEntity<BadRequestException> })
    @ApiConflictResponse({ type: HttpResponseEntity<ConflictException> })
    @ApiNotFoundResponse({ type: HttpResponseEntity<NotFoundException> })
    localSignup(@Body() body: LocalSignupRequestDto): Promise<boolean> {
        return this.authenticationService.localSignup(body);
    }

    @Post('local/login')
    @Throttle({ default: { limit: 3, ttl: 60000 } })
    @HttpResponse(SUCCESS_LOCAL_LOGIN_MESSAGE, HttpStatus.OK)
    @ApiOperation({ description: 'Enter to app with the local login', operationId: 'localLogin' })
    @ApiOkResponse({ type: HttpResponseEntity<boolean> })
    @ApiInternalServerErrorResponse({ type: HttpResponseEntity<InternalServerErrorException> })
    @ApiBadRequestResponse({ type: HttpResponseEntity<BadRequestException> })
    @ApiNotFoundResponse({ type: HttpResponseEntity<NotFoundException> })
    @ApiForbiddenResponse({ type: HttpResponseEntity<ForbiddenException> })
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
        description: 'Send a token for the process of resetting a password',
        operationId: 'localForgotPassword',
    })
    @ApiOkResponse({ type: HttpResponseEntity<boolean> })
    @ApiInternalServerErrorResponse({ type: HttpResponseEntity<InternalServerErrorException> })
    @ApiBadRequestResponse({ type: HttpResponseEntity<BadRequestException> })
    @ApiNotFoundResponse({ type: HttpResponseEntity<NotFoundException> })
    localForgotPassword(@Body() body: LocalForgotPasswordRequestDto): Promise<boolean> {
        return this.authenticationService.localForgotPassword(body);
    }

    @Post('local/reset-password')
    @Throttle({ default: { limit: 2, ttl: 300000 } })
    @HttpResponse(SUCCESS_LOCAL_RESET_PASSWORD_MESSAGE, HttpStatus.OK)
    @ApiOperation({ description: 'Reset the password', operationId: 'localResetPassword' })
    @ApiOkResponse({ type: HttpResponseEntity<boolean> })
    @ApiInternalServerErrorResponse({ type: HttpResponseEntity<InternalServerErrorException> })
    @ApiNotFoundResponse({ type: HttpResponseEntity<NotFoundException> })
    @ApiBadRequestResponse({ type: HttpResponseEntity<BadRequestException> })
    localResetPassword(@Body() body: LocalResetPasswordRequestDto): Promise<boolean> {
        return this.authenticationService.localResetPassword(body);
    }

    @Post('local/account/initiation')
    @Throttle({ default: { limit: 2, ttl: 300000 } })
    @HttpResponse(SUCCESS_LOCAL_ACCOUNT_INITIATION, HttpStatus.OK)
    @ApiOperation({
        description: 'Send a token for initiation of a local account',
        operationId: 'localAccountInitiation',
    })
    @ApiOkResponse({ type: HttpResponseEntity<boolean> })
    @ApiInternalServerErrorResponse({ type: HttpResponseEntity<InternalServerErrorException> })
    @ApiBadRequestResponse({ type: HttpResponseEntity<BadRequestException> })
    @ApiNotFoundResponse({ type: HttpResponseEntity<NotFoundException> })
    localAccountInitiation(@Body() body: LocalAccountInitiationRequestDto): Promise<boolean> {
        return this.authenticationService.localAccountInitiation(body);
    }

    @Post('local/account')
    @Throttle({ default: { limit: 2, ttl: 300000 } })
    @HttpResponse(SUCCESS_LOCAL_ACCOUNT_CREATION, HttpStatus.CREATED)
    @ApiOperation({ description: 'Create a local account', operationId: 'localAccountCreation' })
    @ApiCreatedResponse({ type: HttpResponseEntity<boolean> })
    @ApiInternalServerErrorResponse({ type: HttpResponseEntity<InternalServerErrorException> })
    @ApiBadRequestResponse({ type: HttpResponseEntity<BadRequestException> })
    @ApiNotFoundResponse({ type: HttpResponseEntity<NotFoundException> })
    localAccountCreation(@Body() body: LocalAccountCreationRequestDto): Promise<boolean> {
        return this.authenticationService.localAccountCreation(body);
    }

    @Get('google')
    @Throttle({ default: { limit: 3, ttl: 60000 } })
    @UseGuards(GoogleAuthGuard)
    @ApiOperation({
        description: 'Create or login a google account',
        operationId: 'google',
    })
    google(): void {}

    @Get('google/callback')
    @Throttle({ default: { limit: 3, ttl: 60000 } })
    @UseGuards(GoogleAuthGuard)
    @HttpResponse(SUCCESS_LOCAL_LOGIN_MESSAGE, HttpStatus.OK)
    @ApiOperation({
        description: 'This is the callback of google login',
        operationId: 'googleLogin',
    })
    @ApiOkResponse({ type: HttpResponseEntity<boolean> })
    @ApiInternalServerErrorResponse({ type: HttpResponseEntity<InternalServerErrorException> })
    @ApiBadRequestResponse({ type: HttpResponseEntity<BadRequestException> })
    @ApiNotFoundResponse({ type: HttpResponseEntity<NotFoundException> })
    @ApiUnauthorizedResponse({ type: HttpResponseEntity<UnauthorizedException> })
    @ApiExcludeEndpoint()
    googleLogin(
        @Res({ passthrough: true }) response: Response,
        @OauthCurrentUser() user: IOauthCurrentUser,
    ): Promise<boolean> {
        return this.authenticationService.oauthLogin(response, user);
    }
}
