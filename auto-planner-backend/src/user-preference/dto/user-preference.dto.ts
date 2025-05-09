import { ApiProperty } from '@nestjs/swagger';

export class UserPreferenceDto {
  @ApiProperty({ example: 'focus', enum: ['focus', 'multi'] })
  style: 'focus' | 'multi';

  @ApiProperty({ example: ['월', '화', '수'] })
  studyDays: string[];

  @ApiProperty({ example: 3 })
  sessionsPerDay: number;
}