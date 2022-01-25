import { UserRepository } from '../user-details/repositories/UserRepository';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '../user-details/entities/User';
import CommonException from 'src/models/CommonException';
import ErrorCodes from 'src/utils/ErrorCodes';

@Injectable()
export class JwtTokenService {
    jwt = require('jsonwebtoken');

    constructor(private configService: ConfigService, private userRepository: UserRepository) {}

    generateToken = (userDetails: User) => {
        const payload = {
            userId: userDetails.id,
            userEmail: userDetails.email
        };

        return this.jwt.sign(payload, this.configService.get('JWT_SECRET'));
    };

    verifyToken = (token: string) => {
        return this.jwt.verify(token, this.configService.get('JWT_SECRET'),function(err, decoded) {
            if (err) {
                throw new CommonException(ErrorCodes.JWT_ERROR,err.message)
            }
            return decoded
        });
    };
 

}
