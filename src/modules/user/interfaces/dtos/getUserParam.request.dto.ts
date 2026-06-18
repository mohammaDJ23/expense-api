import { IsUUID } from 'class-validator';

export class GetUserRequestDto {
    @IsUUID()
    id: string;
}
