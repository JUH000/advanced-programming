import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        userId: createUserDto.userId,
        password: createUserDto.password,
        studyPreference: createUserDto.studyPreference,
        tokenFreeLogin: true,
      },
    });
  }

  async findOne(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { userId } });
    if (!user) throw new NotFoundException(`User with ID ${userId} not found`);
    return user;
  }
  async findAll() {
    return this.prisma.user.findMany();
  } 

}