import { AUTH_SKIP } from './auth.constants';

export const AuthSkip = (skip = true) => {
  return (
    target: any,
    key?: string | symbol,
    descriptor?: TypedPropertyDescriptor<any>,
  ) => {
    if (descriptor) {
      Reflect.defineMetadata(AUTH_SKIP, skip, descriptor.value);
      return descriptor;
    }
    Reflect.defineMetadata(AUTH_SKIP, skip, target);
    return target;
  };
};
