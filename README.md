# Hacking Nest Controllers to Dynamically Add Metadata

## The Problem

So say that we have this awesome module that provides a controller under the hood. This controller is fully managed by the package/module. We have a global authentication guard in place to make sure that all of our routes are guarded by default and we have a decorator to apply metadata to skip the guard if we so choose. How do we skip the authentication on this controller that's handled by the module?

## The Solution(s) (That I know of)

1) Most straightforward, but kind of ugly: call the decorator directly ourselves. 

As Decorators are just functions, we're able to call them directly instead of using the `@Decorator()` syntax. In this case, we could do something like

```ts
import { DynaModule } from './dyna/dyna.module';
import { DynaController } from './dyna/dyna.controller';
import { AuthSkip }  from './auth/auth-skip.decorator';

AuthSkip()(DynaController)

@Module({
  imports: [DynaModule],
  ...
})
export class AppModule {}
```

2) My Preference: Add a `decorators` property to the dynamic module's config

Ths actually doesn't have to come from the actual module's config, and it's a similar solution to above, calling the decorator manually, but the difference is where the decorator is called from. In this case, it would be from inside a controller hack provider, where we can already change the endpoint for a controller. Something like this would allow devs to pass in an array of class decorators (it can get even more complex if you really want). The beauty of this approach (in my opinion) is that it abstracts away the details of calling the decorator manually. The approach would look something like this:

```ts
import { DynaModule } from './dyna/dyna.module';
import { AuthSkip }  from './auth/auth-skip.decorator';

@Module({
  imports: [DynaModule.forRoot({
    decorators: [AuthSkip()],
    endpoint: 'dynamic',
  })],
  ...
})
export class AppModule {}
```

## Limitations

We can't use decorators like `@UseGuards()` or `@UseInterceptors()` due to how Nest reads all the controllers, [then their metadata](https://github.com/nestjs/nest/blob/master/packages/core/guards/guards-context-creator.ts), [to set up the request cycle](https://github.com/nestjs/nest/blob/4b7c1ad465abbfff783b430b9e6e543a32dda021/packages/core/router/router-execution-context.ts#L116). (if you want to read through it, knock yourself out, otherwise just take my word for it) For this reason, the only thing we can add is things like `@OgmaSkip()` or `@AuthSkip()`, decorators that add metadata that will be read _during_ the request.