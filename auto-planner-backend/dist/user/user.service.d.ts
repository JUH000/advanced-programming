import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
        userId: string;
        password: string;
        id: number;
        tokenFreeLogin: boolean;
        createdAt: Date;
    }>;
    findOne(userId: string): Promise<{
        userId: string;
        password: string;
        id: number;
        tokenFreeLogin: boolean;
        createdAt: Date;
    } | null>;
    findAll(): Promise<{
        userId: string;
        password: string;
        id: number;
        tokenFreeLogin: boolean;
        createdAt: Date;
    }[]>;
}
