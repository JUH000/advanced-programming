import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserPreferenceService } from './user-preference.service';
import { UserPreferenceDto } from './dto/user-preference.dto';

@Controller('user-preference')
export class UserPreferenceController {
  constructor(private readonly userPreferenceService: UserPreferenceService) {}

  @Post(':userId')
  savePreference(
    @Param('userId') userId: string,
    @Body() dto: UserPreferenceDto,
  ) {
    return this.userPreferenceService.save(userId, dto);
  }

  @Get(':userId')
  getPreference(@Param('userId') userId: string) {
    return this.userPreferenceService.findByUserId(userId);
  }
}