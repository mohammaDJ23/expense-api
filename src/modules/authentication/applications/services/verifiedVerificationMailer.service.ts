import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import type { IService } from '@/core/interfaces/service.interface';

interface IInput {
    email: string;
}

@Injectable()
export class VerifiedVerificationMailerService implements IService<IInput, void> {
    constructor(private readonly mailerService: MailerService) {}

    async execute(input: IInput): Promise<void> {
        await this.mailerService.sendMail({
            to: input.email,
            subject: 'Email verification was success',
            html: `
                <div style="font-family: Arial, sans-serif;">
                    <p>Hello <strong>${input.email}</strong>,</p>
                    <p>Your email has been verified please use the below link to enter to the app.</p>
                    <p>
                        Click here:<br/>
                        <a href="${process.env.APP_URL}/authentication/login" style="font-weight: bold; color: #0066cc;">
                            Login page
                        </a>
                    </p>
                    <p>Best regards,<br/>Your Team</p>
                </div>
            `,
        });
    }
}
