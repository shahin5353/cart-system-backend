import { Cart } from './../../cart/entities/Cart';
import { BaseDatabaseEntity } from 'src/models/BaseDatabaseEntity';
import { Entity, Column, OneToOne } from 'typeorm';


//Database Object Model for "USER" Table
@Entity({ name: 'user', schema: 'public' })
export class User extends BaseDatabaseEntity{

    @Column({ nullable: false })
    email: string;

    @Column({  nullable: false, select:false })
    password: string;

    @OneToOne(type => Cart,cart=>cart.user, { eager: false })
    cart: Cart;

}
