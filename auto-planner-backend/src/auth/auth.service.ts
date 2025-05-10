import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(userId: string, password: string) {
    try {
      const user = await this.userService.findOne(userId);

      if (user.tokenFreeLogin) return user;
      if (user.password !== password) return null;
      return user;
    } catch (err) {
      return await this.userService.create({
        userId,
        password,
        studyPreference: '알수없음',
      });
    }
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto.userId, dto.password);

    if (!user) throw new UnauthorizedException('잘못된 사용자 정보입니다.');

    const payload = { sub: user.userId };
    return { access_token: this.jwtService.sign(payload) };
  }

  async signup(dto: CreateUserDto) {
    return await this.userService.create(dto);
  }
}