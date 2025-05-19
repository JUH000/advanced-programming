// planner.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { PlannerController } from './planner.controller';

describe('PlannerController', () => {
  let controller: PlannerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlannerController],
    }).compile();

    controller = module.get<PlannerController>(PlannerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
