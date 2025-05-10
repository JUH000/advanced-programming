import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: '사용자 등록' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  @ApiOperation({ summary: '사용자 조회' })
  @ApiParam({ name: 'id', description: '사용자 ID' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
    @Get('all')
  @ApiOperation({ summary: '전체 사용자 조회' })
  getAllUsers() {
    return this.userService.findAll();
  }
}
