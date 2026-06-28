import { IsUUID } from 'class-validator';

export class DeleteBillRequestDto {
    @IsUUID()
    id: string;
}
