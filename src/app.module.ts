import { Module, UseGuards } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DynaModule } from './dyna/dyna.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './jwt.guard';
import { AuthSkip } from './auth/auth-skip.decorator';
import { AuthGuard } from '@nestjs/passport';
import { DynaController } from './dyna/dyna.controller';

// AuthSkip()(DynaController);

@Module({
  imports: [
    DynaModule.forRoot(DynaModule, {
      // decorators: [AuthSkip(), UseGuards(AuthGuard('jwt'))],
      decorators: [AuthSkip()],
      endpoint: 'dynamic',
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {}
