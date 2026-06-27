import { IsUUID } from 'class-validator';

export class DeleteReceiverRequestDto {
    @IsUUID()
    id: string;
}
