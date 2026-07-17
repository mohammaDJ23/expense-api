import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import type { IService } from '@/core/interfaces/service.interface';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class ResetPasswordMailerService implements IService<ISelectUser, void> {
    constructor(private readonly mailerService: MailerService) {}

    async execute(input: ISelectUser): Promise<void> {
        const link = `${process.env.APP_URL}/authentication/login`;
        const subject = 'Password changed';
        const html = `
            <div style="font-family: Arial, sans-serif;">
                <p>Hello <strong>${input.email}</strong>,</p>
                <p>Your password has been changed</p>
                <p>
                    <a href="${link}" style="font-weight: bold; color: #0066cc;">
                        Go to the login page
                    </a>
                </p>
            </div>
        `;

        await this.mailerService.sendMail({
            to: input.email,
            subject,
            html,
        });
    }
}
