import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import Joi from 'joi';

@Injectable()
export class JoiValidationInterceptor implements NestInterceptor {
  constructor(private schema: Joi.ObjectSchema) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const combinedData = this.combineParameters(request);

    const { error } = this.schema.validate(combinedData, { abortEarly: false });
    if (error) {
      const firstError = error.details[0].message.replace(/"/g, '');
      const allErrors = {};

      error.details.forEach((detail) => {
        const keyText = detail.path[0];
        const errorMessage = detail.message.replace(/"/g, '');

        if (!allErrors[keyText]) {
          allErrors[keyText] = [];
        }
        allErrors[keyText].push(errorMessage);
      });
      //status 422 Unprocessable Entity
      throw new UnprocessableEntityException({
        message: firstError,
        errors: allErrors,
      });
    }
    return next.handle();
  }

  private combineParameters(request: any): any {
    const params = request.params || {};
    const body = request.body || {};
    const query = request.query || {};
    return { ...params, ...body, ...query };
  }
}
