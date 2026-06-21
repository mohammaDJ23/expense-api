import { IsUUID } from 'class-validator';

export class FindBillRequestDto {
    @IsUUID()
    id: string;
}
