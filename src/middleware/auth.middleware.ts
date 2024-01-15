import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  use(req: Request, res: Response, next: NextFunction) {
    let authtToken = req.headers.authorization;

    const l = {
      id: null,
      role: ``,
    };

    if (authtToken) {
      authtToken = authtToken.replace('Bearer ', '');
      try {
        const decodeToken = this.jwtService.decode(authtToken);
        // console.log(decodeToken);
        l.role = decodeToken[`role`];
        l.id = decodeToken[`id`];
      } catch (e) {
        return next();
      }
    }
    // console.log(l.id);
    res.locals = l;

    next();
  }
}
