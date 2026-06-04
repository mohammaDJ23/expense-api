import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';

import type { IVerificationPayload } from '@/modules/authentication/domain/interfaces/verificationPayload.interface';

export class VerificationPayloadEntity implements IVerificationPayload {
    public readonly id: string;
    public readonly email: string;
    public readonly issuedAt: string;

    private constructor(data: IVerificationPayload) {
        this.id = data.id;
        this.email = data.email;
        this.issuedAt = data.issuedAt;
    }

    static create(data: Omit<IVerificationPayload, 'issuedAt'>): VerificationPayloadEntity {
        return new VerificationPayloadEntity({
            id: data.id,
            email: data.email,
            issuedAt: getCurrentUTCTimestamp(),
        });
    }
}
