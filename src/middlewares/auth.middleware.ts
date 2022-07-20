import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { ExpressRequestInterface } from 'src/types/express-request.interface';
import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from 'src/environment/config';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private userService: UserService) {}

  async use(req: ExpressRequestInterface, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }

    const token = req.headers.authorization.split(' ')[1];

    try {
      const tokenPayload = verify(token, JWT_SECRET) as { id: number };

      const user = await this.userService.findById(tokenPayload?.id);

      req.user = user;
    } catch (e) {
      req.user = null;
    }

    next();
  }
}
