import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import type { TInsertUser, TSelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class EmailVerificationMailerService {
    constructor(private readonly mailerService: MailerService) {}

    async sendMail(user: TInsertUser | TSelectUser, token: string): Promise<void> {
        const link = `${process.env.APP_URL}/v1/api/authentication/verify-email-verification-token?token=${token}`;
        const subject = 'Verify Your Email Address';
        const html = `
            <div style="font-family: Arial, sans-serif;">
                <p>Hello <strong>${user.email}</strong>,</p>
                
                <p>Thank you for registering! Please verify your email address to activate your account.</p>
                
                <p>
                    Click the link below to verify your email:<br/>
                    <a href="${link}" style="font-weight: bold; color: #0066cc;">
                        ${link}
                    </a>
                </p>
                
                <p>Best regards,<br/>Your Team</p>
            </div>
        `;

        try {
            await this.mailerService.sendMail({
                to: user.email,
                subject,
                html,
            });
        } catch {
            throw new ServiceUnavailableException(
                'Failed to send you the email verification token',
            );
        }
    }
}
