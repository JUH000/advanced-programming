import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(userId: string, password: string): Promise<import("../user/dto/create-user.dto").CreateUserDto | null>;
    login(dto: LoginDto): Promise<{
        access_token: string;
    }>;
}
