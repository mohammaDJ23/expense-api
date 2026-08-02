import { BadRequestException, Injectable, type PipeTransform } from '@nestjs/common';

@Injectable()
export class ClientTimezonePipe implements PipeTransform<string | undefined, string> {
    transform(value: string | undefined): string {
        if (!value) {
            throw new BadRequestException('Client-Timezone header is required');
        }

        try {
            Intl.DateTimeFormat(undefined, { timeZone: value });
        } catch {
            throw new BadRequestException('Invalid timezone. Use an IANA timezone.');
        }

        return value;
    }
}
