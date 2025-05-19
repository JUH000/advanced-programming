// planner.module.ts
import { Module } from '@nestjs/common';
import { PlannerController } from './planner.controller';
import { PlannerService } from './planner.service';
import { NotionModule } from 'src/notion/notion.module';
@Module({
  imports: [NotionModule],
  controllers: [PlannerController],
  providers: [PlannerService]
})
export class PlannerModule {}
