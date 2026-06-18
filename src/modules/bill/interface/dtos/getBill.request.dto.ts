import { IsUUID } from 'class-validator';

export class GetBillRequestDto {
    @IsUUID()
    id: string;
}
