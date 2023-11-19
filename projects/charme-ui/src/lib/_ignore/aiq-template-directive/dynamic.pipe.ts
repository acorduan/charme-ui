import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'aiqDynamicPipe',
})
export class DynamicPipe implements PipeTransform {
  transform(value: any, pipeClass: {  obj: any, constructor?: any }, ...args: any[]): unknown {
    const pipe = new pipeClass.obj(pipeClass.constructor);
    return pipe.transform(value, ...args);
  }
}
