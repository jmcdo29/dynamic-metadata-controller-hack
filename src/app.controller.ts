import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthSkip } from './auth/auth-skip.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @AuthSkip()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('protected')
  getProtected() {
    return this.appService.getHello();
  }
}
