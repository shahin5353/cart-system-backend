import { RegisterUserRequest } from './requests/RegisterUserRequest';
import { ApiResponse } from '@nestjs/swagger';
import { Body, Controller, Headers, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUserDetailsRequest } from './requests/GetUserDetailsRequest';
import { SuccessResponse } from 'src/models/SuccessResponse';


@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('getUserDetails')
    @ApiResponse({ status: 201, description: 'Fetch user details and jwt token' })
    async getUserDetails(@Body() request: GetUserDetailsRequest,@Headers() headers:any, @Res() response) {
        const result = await this.userService.getUserDetails(request,headers);
        response.json(new SuccessResponse(result.getValue()));
    }

    @Post('registerUser')
    @ApiResponse({ status: 201, description: 'Register new user' })
    async registerUser( @Body() request: RegisterUserRequest, @Res() response){
        const result = await this.userService.registerUser(request);
        response.json(new SuccessResponse(result.getValue()));
    }

}
