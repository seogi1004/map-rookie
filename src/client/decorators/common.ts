import { omitBy, isUndefined } from 'lodash';

export function clean(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const method: Function = descriptor.value;

  descriptor.value = function (...args: any[]): any {
    return omitBy(method.apply(this, args), isUndefined);
  };
}
