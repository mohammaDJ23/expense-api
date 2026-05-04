import type { ISignup } from '@/modules/authentication/domain/interfaces/signin.interface';

export class SignupEntity implements ISignup {
    public readonly email: string;
    public readonly password: string;

    private constructor(data: SignupEntity) {
        this.email = data.email;
        this.password = data.password;
    }

    static create(data: SignupEntity) {
        return new SignupEntity({
            email: data.email,
            password: data.password,
        });
    }
}
