import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsNotEmpty, IsNumber} from 'class-validator';
 
export class ProductByIdRequest {

    @ApiModelProperty()
    @IsNotEmpty()
    @IsNumber()
    id: number;

}
