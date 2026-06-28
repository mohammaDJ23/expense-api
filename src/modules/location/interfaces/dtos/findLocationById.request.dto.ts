import { IsUUID } from 'class-validator';

export class FindLocationByIdRequestDto {
    @IsUUID()
    id: string;
}
