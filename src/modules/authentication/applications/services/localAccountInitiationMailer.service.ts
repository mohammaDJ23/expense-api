import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import type { IService } from '@/core/interfaces/service.interface';

interface IInput {
    email: string;
    token: string;
}

@Injectable()
export class LocalAccountInitiationMailerService implements IService<IInput, void> {
    constructor(private readonly mailerService: MailerService) {}

    async execute(input: IInput): Promise<void> {
        await this.mailerService.sendMail({
            to: input.email,
            subject: 'Local account creation process',
            html: `
                <div style="font-family: Arial, sans-serif;">
                    <p>Hello <strong>${input.email}</strong>,</p>
                    <p>For creating a local account click on the below link.</p>
                    <p>
                        <a href="${process.env.APP_URL}/authentication/local-account-creation?token=${input.token}" style="font-weight: bold; color: #0066cc;">
                            Go to the local account creation page
                        </a>
                    </p>
                </div>
            `,
        });
    }
}
