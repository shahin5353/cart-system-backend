import { User } from 'src/domains/user-details/entities/User';
import {Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { BaseDatabaseEntity } from 'src/models/BaseDatabaseEntity';


//Database Object Model for "TOKEN" Table
//Here will manage account verify token and password reset token
@Entity({ name: 'cart', schema: 'public' })
export class Cart extends BaseDatabaseEntity{

    @ApiModelProperty()
    @Column({type:'json'})
    items:ItemObject[];

    @ApiModelProperty()
    @OneToOne(type => User,user=>user.cart, { eager: false })
    @JoinColumn()
    public user: User;
}

export class ItemObject {
    productId: number;
    quantity: number;
 }