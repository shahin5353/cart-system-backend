import { CreateProductsRequest } from './../requests/CreateProductsRequest';
import { EntityRepository, Repository } from 'typeorm';
import { Products } from '../entities/Products';
import { GetProductsRequest } from '../requests/GetProductsRequest';

@EntityRepository(Products)
export class ProductsRepository extends Repository<Products> {

    public createProduct = async (request: CreateProductsRequest) => {
        let newProduct = new Products();
        newProduct['name'] = request.name;
        newProduct['price'] = request.price;
        newProduct['description'] = request.description;
        newProduct['image'] = request.image;
        let saveProduct: Products = await this.save(newProduct);

        return saveProduct;

    }

    public getProductById = async (id: number) => {
        let product: Products = await this.findOne({ where: { id: id } });
        return product;
    }

    public getProducts = async (request: GetProductsRequest) => {
        let products: Products[] = await this.find();
        return products;
    }

}
