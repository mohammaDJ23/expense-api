import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import type { IService } from '@/core/interfaces/service.interface';

interface IInput {
    email: string;
    token: string;
}

@Injectable()
export class VerificationMailerService implements IService<IInput, void> {
    constructor(private readonly mailerService: MailerService) {}

    async execute(input: IInput): Promise<void> {
        await this.mailerService.sendMail({
            to: input.email,
            subject: 'Verify Your Email Address',
            html: `
                <div style="font-family: Arial, sans-serif;">
                    <p>Hello <strong>${input.email}</strong></p>
                    <p>Thank you for registering! Please verify your email address to activate your account.</p>
                    <p>
                        Click the link below to verify your email:<br/>
                        <a href="${process.env.APP_URL}/authentication/verification?token=${input.token}" style="font-weight: bold; color: #0066cc;">
                            Verify my account
                        </a>
                    </p>
                    <p>Best regards,<br/>Your Team</p>
                </div>
            `,
        });
    }
}
