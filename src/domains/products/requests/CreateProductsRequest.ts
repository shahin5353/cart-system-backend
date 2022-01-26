import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsNumber, IsString, IsOptional, Min, MaxLength, IsNotEmpty, MinLength } from 'class-validator';
 

export class CreateProductsRequest {

    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(50, {
        message: 'Name is too long. Maximum length is $constraint1 characters',
    })
    @MinLength(5, {
        message: 'Name is too short. Minimum length is $constraint1 characters',
    })
    name: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsNumber()
    @Min(0,{
        message: "Negative price in not allowed"
    })
    price: number;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(240, {
        message: 'Image link is too long. Maximum length is $constraint1 characters',
    })
    @MinLength(5, {
        message: 'Image link is too short. Minimum length is $constraint1 characters',
    })
    image: string;

    @ApiModelProperty()
    @IsOptional()
    @IsString()
    @MaxLength(120, {
        message: 'Description is too long. Maximum length is $constraint1 characters',
    })
    @MinLength(20, {
        message: 'Description is too short. Minimum length is $constraint1 characters',
    })
    description: string;

}




