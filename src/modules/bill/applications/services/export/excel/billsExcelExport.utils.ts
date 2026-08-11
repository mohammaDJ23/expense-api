import { getCurrentUTCTimestamp } from '@/core/utils/getCurrentUTCTimestamp.util';

export function getBillsExcelFilename(): string {
    return `bills_${getCurrentUTCTimestamp()}.xlsx`;
}
