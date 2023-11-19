import { Pipe, PipeTransform } from '@angular/core';
import { DynamicPipeModel } from "./aiq-table.model";

@Pipe({
  name: 'aiqDynamicPipe',
})
export class AiqDynamicPipe implements PipeTransform {
  transform(value: any, pipeClass: DynamicPipeModel, ...args: any[]): unknown {
    const pipe = new pipeClass.obj(pipeClass.constructor);
    return pipe.transform(value, ...args);
  }
}
