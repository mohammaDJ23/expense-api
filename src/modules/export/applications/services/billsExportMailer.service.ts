import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import type { IService } from '@/core/interfaces/service.interface';

interface IInput {
    email: string;
    buffer: Buffer;
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
                    <p>Please open the Excel file attached.</p>
                    <p>Best regards,<br/>Expense Tracker Team</p>
                `,
                attachments: [
                    {
                        filename: 'bills.xlsx',
                        content: Buffer.from(input.buffer),
                        contentType:
                            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    },
                ],
            });
        } catch {
            throw new ServiceUnavailableException('Could not send the email');
        }
    }
}
