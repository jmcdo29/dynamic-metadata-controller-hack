import { Body, Controller, Post } from '@nestjs/common';
import { AuthSkip } from './auth-skip.decorator';
import { AuthService } from './auth.service';

@AuthSkip(false)
@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @AuthSkip(true)
  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    return this.service.login(body.email, body.password);
  }
}
