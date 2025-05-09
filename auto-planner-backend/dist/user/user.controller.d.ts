import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): {
        message: string;
        data: CreateUserDto;
    };
    findOne(id: string): CreateUserDto;
}
