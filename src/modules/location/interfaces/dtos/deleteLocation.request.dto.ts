import { IsUUID } from 'class-validator';

export class DeleteLocationRequestDto {
    @IsUUID()
    id: string;
}
