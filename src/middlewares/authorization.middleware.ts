import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtTokenService } from '../domains/jwt-token/jwt-token.service';
import { JwtPayload } from '../domains/jwt-token/JwtPayload';

//Middleware to verify JWT token for all request
@Injectable()
export class JWTAuthorizationMiddleware implements NestMiddleware {
    constructor(private jwtTokenService: JwtTokenService) {}

    async use(req: Request, res: Response, next: Function) {
        const jwtToken: any = req.header('jwtTokenHeader');
        const verifiedToken: JwtPayload = this.jwtTokenService.verifyToken(jwtToken);

        req.body.requesterProfileId = verifiedToken.userId;

        next();
    }
}
