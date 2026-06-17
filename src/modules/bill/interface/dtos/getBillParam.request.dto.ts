import { IsUUID } from 'class-validator';

export class GetBillParam {
    @IsUUID()
    id: string;
}
