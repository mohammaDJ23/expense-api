import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { UserRoles } from '@/modules/user/domain/enums/userRoles.enum';

import type { IUser } from '@/modules/user/domain/interfaces/user.interface';

@Entity('users')
export class User implements IUser {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        unique: true,
        length: 150,
        type: 'varchar',
    })
    email: string;

    @Column({
        type: 'enum',
        enum: UserRoles,
        default: UserRoles.USER,
        nullable: false,
    })
    role: UserRoles;

    @Column({
        length: 50,
        type: 'varchar',
        nullable: true,
    })
    firstName: string | null;

    @Column({
        length: 50,
        type: 'varchar',
        nullable: true,
    })
    lastName: string | null;

    @Column({
        length: 500,
        type: 'varchar',
        nullable: true,
    })
    avatar: string | null;

    @Column({
        type: 'varchar',
        length: 20,
        nullable: true,
    })
    phone: string | null;

    @Column({
        name: 'hashed_password',
        length: 255,
        type: 'varchar',
        select: false,
    })
    hashedPassword: string;

    @Column({
        name: 'verified_at',
        type: 'timestamptz',
        nullable: true,
    })
    verifiedAt: Date | null;

    @CreateDateColumn({
        type: 'timestamptz',
        name: 'created_at',
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamptz',
        name: 'updated_at',
        nullable: true,
    })
    updatedAt: Date | null;

    @Column({
        type: 'timestamptz',
        name: 'last_login_at',
        nullable: true,
    })
    lastLoginAt: Date | null;
}
