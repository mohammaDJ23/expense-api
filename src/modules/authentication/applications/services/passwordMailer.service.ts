import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import type { IService } from '@/core/interfaces/service.interface';

interface IInput {
    email: string;
    token: string;
}

@Injectable()
export class PasswordMailerService implements IService<IInput, void> {
    constructor(private readonly mailerService: MailerService) {}

    async execute(input: IInput): Promise<void> {
        await this.mailerService.sendMail({
            to: input.email,
            subject: 'Verify Your forgot password process',
            html: `
                <div style="font-family: Arial, sans-serif;">
                    <p>Hello <strong>${input.email}</strong>,</p>
                    <p>Thank you for registering! Please click on this link.</p>
                    <p>
                        <a href="${process.env.APP_URL}/authentication/reset-password?token=${input.token}" style="font-weight: bold; color: #0066cc;">
                            Go to the forgot password page
                        </a>
                    </p>
                </div>
            `,
        });
    }
}
