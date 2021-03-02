import { Test, TestingModule } from '@nestjs/testing';
import { DynaController } from './dyna.controller';

describe('DynaController', () => {
  let controller: DynaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DynaController],
    }).compile();

    controller = module.get<DynaController>(DynaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
