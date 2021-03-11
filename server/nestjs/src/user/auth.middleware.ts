import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { UserService } from './user.service';
import { NextFunction, Request } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET } from '../../config';
import { JWTInfo } from './user.interface';
import { User } from './user.entity';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeaders = req.headers.authorization;
    const token = authHeaders;
    if (token) {
      const decoded = verify(token, SECRET) as JWTInfo;
      const user = await this.userService.findByUserId(decoded.id);

      if (!user) {
        throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
      }
      req.user = user;
      next();
    } else {
      throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
    }
  }
}
