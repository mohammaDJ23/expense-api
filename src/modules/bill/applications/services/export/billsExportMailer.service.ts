import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { EXCEL_FILE_CONTENT_TYPE } from '@/core/features/excelFile/excelFile.constants';

import { BILL_EXPORT_FILE_NAME } from './billsExportGenerator.constants';

import type { IService } from '@/core/interfaces/service.interface';
import type { PassThrough } from 'node:stream';

interface IInput {
    email: string;
    stream: PassThrough;
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
                        filename: BILL_EXPORT_FILE_NAME,
                        content: input.stream,
                        contentType: EXCEL_FILE_CONTENT_TYPE,
                    },
                ],
            });
        } catch {
            throw new ServiceUnavailableException('Could not send the email');
        }
    }
}
