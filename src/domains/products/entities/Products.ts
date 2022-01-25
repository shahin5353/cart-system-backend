import {Entity, Column } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { BaseDatabaseEntity } from 'src/models/BaseDatabaseEntity';

@Entity({ name: 'products', schema: 'public' })
export class Products extends BaseDatabaseEntity{

    @ApiModelProperty()
    @Column({nullable:false})
    name:string;

    @ApiModelProperty()
    @Column({nullable:false})
    price:number;

    @ApiModelProperty()
    @Column({nullable:true})
    description:string;

}