import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(dto: LoginDto): Promise<{
        access_token: string;
    }>;
    redirectToNotion(userId: string, res: Response): Response<any, Record<string, any>>;
    handleNotionCallback(code: string, userId: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
