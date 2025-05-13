import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
        id: number;
        userId: string;
        password: string;
        tokenFreeLogin: boolean;
        createdAt: Date;
    }>;
    findOne(userId: string): Promise<{
        id: number;
        userId: string;
        password: string;
        tokenFreeLogin: boolean;
        createdAt: Date;
    }>;
    findAll(): Promise<{
        id: number;
        userId: string;
        password: string;
        tokenFreeLogin: boolean;
        createdAt: Date;
    }[]>;
}
