import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ExpressRequestInterface } from 'src/types/express-request.interface';

export const User = createParamDecorator(
  (field: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<ExpressRequestInterface>();

    if (!request.user) {
      return null;
    }

    if (field) {
      return request.user[field];
    }

    return request.user;
  },
);
