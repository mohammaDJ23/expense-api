import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import type { IService } from '@/core/interfaces/service.interface';
import type Mail from 'nodemailer/lib/mailer';

interface IInput {
    email: string;
    attachments: Mail.Attachment[];
}

@Injectable()
export class BillsExportMailerService implements IService<IInput, void> {
    constructor(private readonly mailerService: MailerService) {}

    async execute(input: IInput): Promise<void> {
        try {
            await this.mailerService.sendMail({
                to: input.email,
                subject: 'Your bills export is ready',
                html: `
                    <p>Hello,</p>
                    <p>Your bills export has been generated successfully.</p>
                    <p>Best regards,<br/>Expense Tracker Team</p>
                `,
                attachments: input.attachments,
            });
        } catch {
            throw new ServiceUnavailableException('Could not send the email');
        }
    }
}
