import { Test, TestingModule } from '@nestjs/testing';
import { TasksGateway } from './tasks.gateway';
import { beforeEach, describe, it } from 'node:test';

describe('TasksGateway', () => {
  let gateway: TasksGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksGateway],
    }).compile();

    gateway = module.get<TasksGateway>(TasksGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
