import { GetCartRequest } from './../requests/GetCartRequest';
import { RemoveFromCartRequest } from './../requests/RemoveFromCart';
import { Cart } from './../entities/Cart';
import { EntityRepository, Repository } from 'typeorm';
import { AddToCartRequest } from '../requests/AddToCartRequets';

@EntityRepository(Cart)
export class CartRepository extends Repository<Cart> {

    public addToCart = async (request: AddToCartRequest) => {
        let existingCart:Cart = await this.findOne({where:{user:request.requesterUserObject}})
        if(!existingCart){
            let newCart = new Cart();
            newCart['items'] = [{productId:request.productId, quantity: 1}];
            newCart['user'] = request.requesterUserObject;
            let saveNewCart: Cart = await this.save(newCart);
            return saveNewCart;
        }else{
            let newItem = true;
            await Promise.all(
                existingCart.items.map((item,index)=>{
                    if(item.productId === request.productId){
                        existingCart.items[index].quantity = existingCart.items[index].quantity+1;
                        newItem=false;
                        return
                    }
                })
                
            )
            if(newItem){
                existingCart['items']=[...existingCart['items'],{productId:request.productId, quantity: 1}]
            }
            let updateCart: Cart = await this.save(existingCart);
            return updateCart;
        }
       
    }

    public removeFromCart = async (request: RemoveFromCartRequest) => {
        let existingCart:Cart = await this.findOne({where:{user:request.requesterUserObject}})
        if(!existingCart){
            return { removeCart: 'success' };
        }else{
            if(existingCart.items && existingCart.items.length){
                await Promise.all(existingCart.items.map((item,index)=>{
                    if(item.productId === request.productId){
                        if(item.quantity>1){
                            existingCart.items[index].quantity = existingCart.items[index].quantity-1;
                        }else{
                            existingCart.items.splice(index,1);
                        }
                    }
                }))
                if(existingCart.items.length){
                    console.log("aaaaaaa")
                    let updateCart: Cart = await this.save(existingCart);
                    return updateCart;
                }else{
                    console.log("bbbbbbb")
                    let deleteCart: Cart = await this.remove(existingCart);
                    return deleteCart;
                }
            }
        }
       

    }

    public getCart = async (request: GetCartRequest) => {
        let cart: Cart = await this.findOne({where:{user:request.requesterUserObject}});
        return cart;
    }

    public resetCart = async (cart) => {
        let deleteCart = await this.remove(cart);
        return deleteCart;
    }

}
