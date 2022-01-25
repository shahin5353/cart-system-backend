import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { BaseEntity, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

//Base Database Entity for every table will automatically create
export class BaseDatabaseEntity extends BaseEntity {

    @ApiModelProperty()
    @PrimaryGeneratedColumn()
    id:number;

    @ApiModelProperty()
    @CreateDateColumn()
    createdDate: Date;

    @ApiModelProperty()
    @UpdateDateColumn()
    updatedDate: Date;

    @ApiModelProperty()
    @DeleteDateColumn()
    deleteDate: Date;
}