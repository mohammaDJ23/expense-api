import { Exclude, Expose } from 'class-transformer';

export class SignupResponseDto {
    @Expose()
    id: string;

    @Expose()
    email: string;

    @Expose()
    role: string;

    @Expose()
    firstName: string | null;

    @Expose()
    lastName: string | null;

    @Expose()
    avatar: string | null;

    @Expose()
    phone: string | null;

    @Exclude()
    hashedPassword: string;

    @Expose()
    verifiedAt: Date | null;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;

    @Expose()
    lastLoginAt: Date | null;
}
