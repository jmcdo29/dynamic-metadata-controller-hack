import { Controller, Get } from '@nestjs/common';
import { DynaService } from './dyna.service';

@Controller('dyna')
export class DynaController {
  constructor(private readonly service: DynaService) {}

  @Get()
  sayHello() {
    return this.service.getGreeting();
  }
}
