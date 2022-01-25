import { CartRepository } from './repositories/CartRepository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { ProductsRepository } from '../products/repositories/ProductsRepository';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([CartRepository, ProductsRepository])],
  providers: [CartService],
  controllers: [CartController],
  exports: [CartService]
})
export class CartModule {}
