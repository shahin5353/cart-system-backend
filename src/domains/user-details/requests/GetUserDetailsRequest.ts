import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class GetUserDetailsRequest {
    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    password: string;
}
