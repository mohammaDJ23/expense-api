import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import type { TSelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class ForgotPasswordMailerService {
    constructor(private readonly mailerService: MailerService) {}

    async sendMail(user: TSelectUser, token: string): Promise<void> {
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

        try {
            await this.mailerService.sendMail({
                to: user.email,
                subject,
                html,
            });
        } catch {
            throw new ServiceUnavailableException('Failed to send you the forgot password link');
        }
    }
}
