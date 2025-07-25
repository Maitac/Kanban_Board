import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { beforeEach, describe, it } from 'node:test';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
