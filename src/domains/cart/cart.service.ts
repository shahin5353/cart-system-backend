import { RemoveFromCartRequest } from './requests/RemoveFromCart';
import { GetCartRequest } from './requests/GetCartRequest';
import ErrorCodes from 'src/utils/ErrorCodes';
import { ProductsRepository } from './../products/repositories/ProductsRepository';
import { Result } from './../../models/Result';
import { CartRepository } from './repositories/CartRepository';
import { Injectable } from '@nestjs/common';
import { AddToCartRequest } from './requests/AddToCartRequets';
import CommonException from 'src/models/CommonException';
import { Products } from '../products/entities/Products';
import { Cart } from './entities/Cart';

@Injectable()
export class CartService {
    constructor(
        private cartRepository : CartRepository,
        private productsRepository : ProductsRepository,
    ){}

    async addToCart(request: AddToCartRequest): Promise<Result> {
        let product:Products = await this.productsRepository.getProductById(request.productId);
        if(!product) throw new CommonException(ErrorCodes.PRODUCT_NOT_FOUND);
        let saveCart = await this.cartRepository.addToCart(request);
        return Result.success(saveCart);
    }

    async removeFromCart(request: RemoveFromCartRequest): Promise<Result> {
        let product:Products = await this.productsRepository.getProductById(request.productId);
        if(!product) throw new CommonException(ErrorCodes.PRODUCT_NOT_FOUND);
        let saveCart = await this.cartRepository.removeFromCart(request);
        return Result.success(saveCart);
    }

    async getCart(request: GetCartRequest): Promise<Result> {
        let cart: any = await this.cartRepository.getCart(request);
        if(cart && cart.items && cart.items.length){
            await Promise.all(cart.items.map(async (item,index)=>{
                let product:Products = await this.productsRepository.getProductById(item.productId);
                
                if(!product){
                    delete cart.items[index];
                    await this.cartRepository.save(cart);
                }else{
                    cart.items[index].productDetails = product;
                }
            }))
        }
        return Result.success(cart);
    }

    async resetCart(request: GetCartRequest): Promise<Result> {
        let cart:Cart = await this.cartRepository.getCart(request);
        if(!cart) throw new CommonException(ErrorCodes.CART_NOT_FOUND)
        let resetCart = await this.cartRepository.resetCart(cart);
        return Result.success(resetCart);
    }

}
