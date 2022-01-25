import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProductsRepository } from './repositories/ProductsRepository';

@Module({
    imports: [ConfigModule,TypeOrmModule.forFeature([ProductsRepository])],
    controllers: [ProductsController],
    providers: [ProductsService],
    exports: [ProductsService]
  })
export class ProductsModule {}
