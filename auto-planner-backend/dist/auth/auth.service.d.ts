import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(userId: string, password: string): Promise<{
        userId: string;
        password: string;
        id: number;
        tokenFreeLogin: boolean;
        createdAt: Date;
    } | null>;
    login(dto: LoginDto): Promise<{
        access_token: string;
    }>;
    signup(dto: CreateUserDto): Promise<{
        userId: string;
        password: string;
        id: number;
        tokenFreeLogin: boolean;
        createdAt: Date;
    }>;
}
