import { IsUUID } from 'class-validator';

export class GetReceiverRequestDto {
    @IsUUID()
    id: string;
}
