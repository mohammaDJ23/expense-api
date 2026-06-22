import { IsUUID } from 'class-validator';

export class FindUserConsumerTargetRequestDto {
    @IsUUID()
    id: string;
}
