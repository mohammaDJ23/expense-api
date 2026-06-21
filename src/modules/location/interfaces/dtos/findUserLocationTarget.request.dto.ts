import { IsUUID } from 'class-validator';

export class FindUserLocationTargetRequestDto {
    @IsUUID()
    id: string;
}
