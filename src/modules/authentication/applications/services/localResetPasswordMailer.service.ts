import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';

import type { IService } from '@/core/interfaces/service.interface';

interface IInput {
    email: string;
}

@Injectable()
export class LocalResetPasswordMailerService implements IService<IInput, void> {
    constructor(
        private readonly mailerService: MailerService,
        private readonly configService: ConfigService,
    ) {}

    async execute(input: IInput): Promise<void> {
        await this.mailerService.sendMail({
            to: input.email,
            subject: 'Password changed',
            html: `
                <div style="font-family: Arial, sans-serif;">
                    <p>Hello <strong>${input.email}</strong>,</p>
                    <p>Your password has been changed</p>
                    <p>
                        <a href="${this.configService.getOrThrow<string>('CLIENT_URL')}/authentication/login" style="font-weight: bold; color: #0066cc;">
                            Go to the login page
                        </a>
                    </p>
                </div>
            `,
        });
    }
}
