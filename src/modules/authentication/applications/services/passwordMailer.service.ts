import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { TSelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class PasswordMailerService implements IServiceHandler {
    constructor(private readonly mailerService: MailerService) {}

    async execute(user: TSelectUser, token: string): Promise<void> {
        const link = `${process.env.APP_URL}/authentication/forgot-password/verification?token=${token}`;
        const subject = 'Verify Your forgot password process';
        const html = `
            <div style="font-family: Arial, sans-serif;">
                <p>Hello <strong>${user.email}</strong>,</p>
                <p>Thank you for registering! Please click on this link.</p>
                <p>
                    <a href="${link}" style="font-weight: bold; color: #0066cc;">
                        Go to the forgot password page
                    </a>
                </p>
            </div>
        `;

        await this.mailerService.sendMail({
            to: user.email,
            subject,
            html,
        });
    }
}
