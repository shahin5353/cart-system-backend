import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsNotEmpty, IsEmail, IsString } from 'class-validator';
 
export class RegisterUserRequest {

    @ApiModelProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    password: string;

}
