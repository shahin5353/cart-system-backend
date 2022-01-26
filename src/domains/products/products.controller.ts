import { CreateProductsRequest } from './requests/CreateProductsRequest';
import { ProductByIdRequest } from './requests/ProductByIdRequest';
import { SuccessResponse } from '../../models/SuccessResponse';
import { ProductsService } from './products.service';
import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { ApiTags, ApiHeader, ApiResponse } from '@nestjs/swagger';
import { GetProductsRequest } from './requests/GetProductsRequest';

@Controller('products')
export class ProductsController {
    constructor( private  productsService: ProductsService){}

    @ApiHeader({ name: 'jwtTokenHeader' })
    @Post('createNewProduct')
    @ApiResponse({ status: 201, description: 'Save new product' })
    async createNewProduct( @Body() request: CreateProductsRequest, @Res() response){
        const result = await this.productsService.createProduct(request);
        response.json(new SuccessResponse(result.getValue()));
    }

    @Post('getProducts')
    @ApiResponse({ status: 201, description: 'Fetch all products' })
    async getProducts( @Body() request: GetProductsRequest, @Res() response){
        const result = await this.productsService.getProducts(request);
        response.json(new SuccessResponse(result.getValue()));
    }

    @Post('getProductById')
    @ApiResponse({ status: 201, description: 'Fetch a particular product details using id' })
    async getProductById( @Body() request: ProductByIdRequest, @Res() response){
        const result = await this.productsService.getProductById(request);
        response.json(new SuccessResponse(result.getValue()));
    }
}
