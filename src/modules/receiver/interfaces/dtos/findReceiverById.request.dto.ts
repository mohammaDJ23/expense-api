import { IsUUID } from 'class-validator';

export class FindReceiverByIdRequestDto {
    @IsUUID()
    id: string;
}
