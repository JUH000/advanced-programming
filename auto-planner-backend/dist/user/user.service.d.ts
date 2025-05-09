import { CreateUserDto } from './dto/create-user.dto';
export declare class UserService {
    private users;
    create(createUserDto: CreateUserDto): {
        message: string;
        data: CreateUserDto;
    };
    findOne(id: string): CreateUserDto;
}
