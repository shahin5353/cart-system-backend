import { GetCartRequest } from './requests/GetCartRequest';
import { RemoveFromCartRequest } from './requests/RemoveFromCart';
import { SuccessResponse } from './../../models/SuccessResponse';
import { CartService } from './../cart/cart.service';
import { ApiHeader, ApiResponse } from '@nestjs/swagger';
import { Controller, Post, Body, Res } from '@nestjs/common';
import { AddToCartRequest } from './requests/AddToCartRequets';

@Controller('cart')
@ApiHeader({ name: 'jwtTokenHeader' })
export class CartController {
    constructor( private  cartService: CartService){}

    @Post('addToCart')
    @ApiResponse({ status: 201, description: 'Add items to cart' })
    async addToCart( @Body() request: AddToCartRequest, @Res() response){
        const result = await this.cartService.addToCart(request);
        response.json(new SuccessResponse(result.getValue()));
    }

    @Post('removeFromCart')
    @ApiResponse({ status: 201, description: 'Remove items from cart' })
    async removeFromCart( @Body() request: RemoveFromCartRequest, @Res() response){
        const result = await this.cartService.removeFromCart(request);
        response.json(new SuccessResponse(result.getValue()));
    }

    @Post('getCart')
    @ApiResponse({ status: 201, description: 'Fetch cart items' })
    async getCart( @Body() request: GetCartRequest, @Res() response){
        const result = await this.cartService.getCart(request);
        response.json(new SuccessResponse(result.getValue()));
    }

    @Post('resetCart')
    @ApiResponse({ status: 201, description: 'Reset cart' })
    async resetCart( @Body() request: GetCartRequest, @Res() response){
        const result = await this.cartService.resetCart(request);
        response.json(new SuccessResponse(result.getValue()));
    }
}
