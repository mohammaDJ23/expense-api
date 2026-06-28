import { IsUUID } from 'class-validator';

export class FindConsumerByIdRequestDto {
    @IsUUID()
    id: string;
}
