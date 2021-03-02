import { Test, TestingModule } from '@nestjs/testing';
import { DynaService } from './dyna.service';

describe('DynaService', () => {
  let service: DynaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DynaService],
    }).compile();

    service = module.get<DynaService>(DynaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
