import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsNumber, IsNotEmpty } from 'class-validator';
import { BaseRequest } from 'src/models/BaseRequest';
 

export class RemoveFromCartRequest extends BaseRequest{

    @ApiModelProperty()
    @IsNotEmpty()
    @IsNumber()
    productId: number;

}
