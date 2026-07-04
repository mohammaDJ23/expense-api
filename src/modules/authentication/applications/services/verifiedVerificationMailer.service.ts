import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class VerifiedVerificationMailerService implements IServiceHandler {
    constructor(private readonly mailerService: MailerService) {}

    async execute(user: ISelectUser): Promise<void> {
        const link = `${process.env.APP_URL}/authentication/login`;
        const subject = 'Email verification was success';
        const html = `
            <div style="font-family: Arial, sans-serif;">
                <p>Hello <strong>${user.email}</strong>,</p>
                
                <p>Your email has been verified please use the below link to enter to the app.</p>
                
                <p>
                    Click here:<br/>
                    <a href="${link}" style="font-weight: bold; color: #0066cc;">
                        Login page
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
