import { IsUUID } from 'class-validator';

export class DeleteConsumerRequestDto {
    @IsUUID()
    id: string;
}
