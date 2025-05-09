import { ApiProperty } from '@nestjs/swagger';

// 개별 챕터 정보 DTO
export class ChapterDto {
  @ApiProperty({ example: 'Introduction to Algebra' })
  chapterTitle: string;

  @ApiProperty({ example: 3, description: '난이도 (1~5)' })
  difficulty: number;

  @ApiProperty({ example: 20, description: '분량 (페이지 수 등)' })
  contentVolume: number;
}

// 사용자 전체 입력 DTO
export class AiGeneratePlanDto {
  @ApiProperty({ example: 'user123', description: '사용자 ID' })
  userId: string;
}
