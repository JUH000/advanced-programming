import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<{
        id: number;
        userId: string;
        password: string;
        tokenFreeLogin: boolean;
        createdAt: Date;
    }>;
    findOne(id: string): Promise<{
        id: number;
        userId: string;
        password: string;
        tokenFreeLogin: boolean;
        createdAt: Date;
    }>;
    getAllUsers(): Promise<{
        id: number;
        userId: string;
        password: string;
        tokenFreeLogin: boolean;
        createdAt: Date;
    }[]>;
}
