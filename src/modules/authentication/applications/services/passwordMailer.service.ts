import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import type { IService } from '@/core/interfaces/service.interface';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

interface IInput {
    user: ISelectUser;
    token: string;
}

@Injectable()
export class PasswordMailerService implements IService<IInput, void> {
    constructor(private readonly mailerService: MailerService) {}

    async execute(input: IInput): Promise<void> {
        const link = `${process.env.APP_URL}/authentication/forgot-password/verification?token=${input.token}`;
        const subject = 'Verify Your forgot password process';
        const html = `
            <div style="font-family: Arial, sans-serif;">
                <p>Hello <strong>${input.user.email}</strong>,</p>
                <p>Thank you for registering! Please click on this link.</p>
                <p>
                    <a href="${link}" style="font-weight: bold; color: #0066cc;">
                        Go to the forgot password page
                    </a>
                </p>
            </div>
        `;

        await this.mailerService.sendMail({
            to: input.user.email,
            subject,
            html,
        });
    }
}
