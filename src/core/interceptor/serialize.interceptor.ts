import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UseInterceptors,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';

interface ClassConstructor {
  new (...args: any[]): object;
}
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: ClassConstructor) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    /*
        Run something before a request is handled by an request handler
      */

    return next.handle().pipe(
      map((data: any) => {
        /*
            Run something before response is sent out
          */
        const transformedData = plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
        return transformedData;
      }),
    );
  }
}

export function Serialize(dto: any) {
  return UseInterceptors(new SerializeInterceptor(dto));
}
