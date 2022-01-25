import { RegisterUserRequest } from './requests/RegisterUserRequest';
import { GetUserDetailsRequest } from './requests/GetUserDetailsRequest';
import { Injectable } from '@nestjs/common';
import { JwtTokenService } from '../jwt-token/jwt-token.service';
import { UserRepository } from './repositories/UserRepository';
import { User } from './entities/User';
import CommonException from 'src/models/CommonException';
import ErrorCodes from 'src/utils/ErrorCodes';
import { Result } from 'src/models/Result';

@Injectable()
export class UserService {
    constructor(
        private jwtTokenService: JwtTokenService,
        private userRepository: UserRepository
    ) {}

// UserDetails Service use for Login and Response will be a jwt payload if login cridential match
    async getUserDetails(request: GetUserDetailsRequest, headers:any): Promise<Result> {
        let response = {};
        const user: User = await this.userRepository.getUser(request)
        if(!user) {
            //Throw error User Not Found if login cridential not match
            throw new CommonException(ErrorCodes.USER_NOT_FOUND)
        }
        //Generate jwt with user details and response back
        response['jwtToken'] = this.jwtTokenService.generateToken(user);
        response['userDetails'] = user;
        return Result.success(response);
    }

    async registerUser(request: RegisterUserRequest): Promise<Result> {
        let newUser = new User();
        let existingUser = await this.userRepository.findUserWithEmail(request.email);
        if(existingUser) throw new CommonException(ErrorCodes.USER_ALREADY_EXISTS_WITH_MAIL);
        newUser['email'] =request.email;
        newUser['password']= request.password;
        const user: User = await this.userRepository.save(newUser)
        return Result.success(user);
    }

    
}
