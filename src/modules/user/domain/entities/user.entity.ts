import { UserRoles } from '@/modules/user/domain/enums/userRoles.enum';

import type {
    TPartialInsertUser,
    TRequiredInsertUser,
} from '@/modules/user/infrastructure/schemas/user.schema';

export class UserEntity implements TRequiredInsertUser {
    public readonly id: string;
    public readonly email: string;
    public readonly role: UserRoles;
    public readonly firstName: string | null;
    public readonly lastName: string | null;
    public readonly avatar: string | null;
    public readonly phone: string | null;
    public readonly hashedPassword: string;
    public readonly verifiedAt: Date | null;
    public readonly createdAt: Date;
    public readonly updatedAt: Date;
    public readonly lastLoginAt: Date | null;

    private constructor(data: TRequiredInsertUser) {
        this.id = data.id;
        this.email = data.email;
        this.role = data.role;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.avatar = data.avatar;
        this.phone = data.phone;
        this.hashedPassword = data.hashedPassword;
        this.verifiedAt = data.verifiedAt;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.lastLoginAt = data.lastLoginAt;
    }

    static create(data: TPartialInsertUser): UserEntity {
        return new UserEntity({
            id: data.id ?? '',
            email: data.email ?? '',
            role: data.role ?? UserRoles.USER,
            firstName: data.firstName ?? null,
            lastName: data.lastName ?? null,
            avatar: data.avatar ?? null,
            phone: data.phone ?? null,
            hashedPassword: data.hashedPassword ?? '',
            verifiedAt: data.verifiedAt ?? null,
            createdAt: data.createdAt ?? new Date(),
            updatedAt: data.updatedAt ?? new Date(),
            lastLoginAt: data.lastLoginAt ?? null,
        });
    }

    toInsert(): Omit<UserEntity, 'id'> {
        const userEntity = Object.assign(this);
        delete userEntity.id;
        return userEntity;
    }
}
