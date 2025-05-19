import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<{
        userId: string;
        password: string;
        id: number;
        tokenFreeLogin: boolean;
        createdAt: Date;
    }>;
    findOne(id: string): Promise<{
        userId: string;
        password: string;
        id: number;
        tokenFreeLogin: boolean;
        createdAt: Date;
    } | null>;
    getAllUsers(): Promise<{
        userId: string;
        password: string;
        id: number;
        tokenFreeLogin: boolean;
        createdAt: Date;
    }[]>;
}
