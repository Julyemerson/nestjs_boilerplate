import {
  ExecutionContext,
  NotFoundException,
  createParamDecorator,
} from '@nestjs/common';

export const User = createParamDecorator(
  (filter: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (!request.user) {
      throw new NotFoundException(
        'User not found, Use AuthGuard before using this decorator',
      );
    }

    if (filter) {
      return request.user[filter];
    }

    return request.user;
  },
);
