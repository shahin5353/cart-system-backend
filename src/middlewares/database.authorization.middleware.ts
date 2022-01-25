import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { User } from 'src/domains/user-details/entities/User';
import { UserRepository } from 'src/domains/user-details/repositories/UserRepository';
import ErrorCodes from 'src/utils/ErrorCodes';
import CommonException from 'src/models/CommonException';

//Middleware to check User in database for all request
@Injectable()
export class DBAuthorizationMiddleware implements NestMiddleware {
    constructor(private userRepository: UserRepository) {}

    async use(req: Request, res: Response, next: Function) {
        let user: User = await this.userRepository.findUserWithId(req.body.requesterProfileId);
        //Throw error User Not Found if login cridential not match
        if(!user) throw new CommonException(ErrorCodes.USER_NOT_FOUND);
        //Throw error User is not verified if email not verified yet
        req.body.requesterUserObject = user;

        next();
    }
}
