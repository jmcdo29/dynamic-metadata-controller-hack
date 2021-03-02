import { createConfigurableDynamicRootModule } from '@golevelup/nestjs-modules';
import { Controller, Module } from '@nestjs/common';
import { DynaController } from './dyna.controller';
import { DyanModuleConfig } from './dyna.interface';
import { DynaService } from './dyna.service';

@Module({
  providers: [DynaService],
  controllers: [DynaController],
})
export class DynaModule extends createConfigurableDynamicRootModule<
  DynaModule,
  DyanModuleConfig
>('DYNA_CONFIG', {
  providers: [
    {
      provide: 'CONTROLLER_HACK',
      inject: ['DYNA_CONFIG'],
      useFactory: ({ decorators, endpoint }: DyanModuleConfig) => {
        if (decorators) {
          decorators.forEach((deco) => {
            deco(DynaController);
          });
        }
        if (endpoint) {
          Controller(endpoint)(DynaController);
        }
      },
    },
  ],
}) {}
