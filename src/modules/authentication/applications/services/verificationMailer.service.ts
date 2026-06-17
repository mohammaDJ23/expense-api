import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { TSelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class VerificationMailerService implements IServiceHandler {
    constructor(private readonly mailerService: MailerService) {}

    async execute(user: TSelectUser, token: string): Promise<void> {
        const link = `${process.env.APP_URL}/authentication/verification?token=${token}`;
        const subject = 'Verify Your Email Address';
        const html = `
            <div style="font-family: Arial, sans-serif;">
                <p>Hello <strong>${user.email}</strong>,</p>
                
                <p>Thank you for registering! Please verify your email address to activate your account.</p>
                
                <p>
                    Click the link below to verify your email:<br/>
                    <a href="${link}" style="font-weight: bold; color: #0066cc;">
                        Verify my account
                    </a>
                </p>
                
                <p>Best regards,<br/>Your Team</p>
            </div>
        `;

        await this.mailerService.sendMail({
            to: user.email,
            subject,
            html,
        });
    }
}
