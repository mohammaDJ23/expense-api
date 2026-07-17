import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import type { IService } from '@/core/interfaces/service.interface';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

interface IInput {
    user: ISelectUser;
    token: string;
}

@Injectable()
export class VerificationMailerService implements IService<IInput, void> {
    constructor(private readonly mailerService: MailerService) {}

    async execute(input: IInput): Promise<void> {
        const link = `${process.env.APP_URL}/authentication/verification?token=${input.token}`;
        const subject = 'Verify Your Email Address';
        const html = `
            <div style="font-family: Arial, sans-serif;">
                <p>Hello <strong>${input.user.email}</strong>,</p>
                
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
            to: input.user.email,
            subject,
            html,
        });
    }
}
