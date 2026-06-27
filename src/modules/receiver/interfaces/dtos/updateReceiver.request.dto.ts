import { IsString, IsUUID, Length, Matches } from 'class-validator';

export class UpdateReceiverRequestDto {
    @IsUUID()
    id: string;

    @IsString()
    @Length(3, 50)
    // eslint-disable-next-line security/detect-unsafe-regex
    @Matches(/^[a-zA-Z_]+( [a-zA-Z_]+)*$/, { message: 'Invalid receiver' })
    name: string;
}
