import { ProductByIdRequest } from './requests/ProductByIdRequest';
import { CreateProductsRequest } from './requests/CreateProductsRequest';
import { Result } from '../../models/Result';
import { ProductsRepository } from './repositories/ProductsRepository';
import { Injectable } from '@nestjs/common';
import CommonException from 'src/models/CommonException';
import ErrorCodes from 'src/utils/ErrorCodes';
import { GetProductsRequest } from './requests/GetProductsRequest';
import { Products } from './entities/Products';


@Injectable()
export class ProductsService {
    constructor(
        private productsRepository : ProductsRepository,
    ){}

    async createProduct(request: CreateProductsRequest): Promise<Result> {
        let saveproduct = await this.productsRepository.createProduct(request);
        return Result.success(saveproduct);
    }
    async getProducts(request: GetProductsRequest): Promise<Result> {
        let products: Products[] = await this.productsRepository.getProducts(request);
        return Result.success(products);
    }

    async getProductById(request: ProductByIdRequest): Promise<Result> {
        let product: Products = await this.productsRepository.getProductById(request.id);
        if(!product)throw new CommonException(ErrorCodes.PRODUCT_NOT_FOUND);
        return Result.success(product);
    }

}
