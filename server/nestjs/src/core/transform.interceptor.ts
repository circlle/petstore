import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SuccessResponseDto as Response } from './generic.dto';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  public intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        return {
          data,
          code: 0,
          message: 'success',
        };
      }),
    );
  }
}
