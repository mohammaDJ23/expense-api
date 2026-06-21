import { IsUUID } from 'class-validator';

export class FindUserReceiverTargetRequestDto {
    @IsUUID()
    id: string;
}
