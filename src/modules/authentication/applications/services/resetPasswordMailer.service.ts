import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class ResetPasswordMailerService implements IServiceHandler {
    constructor(private readonly mailerService: MailerService) {}

    async execute(user: ISelectUser): Promise<void> {
        const link = `${process.env.APP_URL}/authentication/login`;
        const subject = 'Password changed';
        const html = `
            <div style="font-family: Arial, sans-serif;">
                <p>Hello <strong>${user.email}</strong>,</p>
                <p>Your password has been changed</p>
                <p>
                    <a href="${link}" style="font-weight: bold; color: #0066cc;">
                        Go to the login page
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
