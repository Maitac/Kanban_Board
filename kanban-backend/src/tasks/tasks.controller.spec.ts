import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { beforeEach, describe, it } from 'node:test';

describe('TasksController', () => {
  let controller: TasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
