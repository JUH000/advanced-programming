import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(dto: LoginDto): Promise<{
        access_token: string;
    }>;
    signup(dto: CreateUserDto): Promise<{
        userId: string;
        password: string;
        studyPreference: string;
        id: number;
        tokenFreeLogin: boolean;
        createdAt: Date;
    }>;
}
