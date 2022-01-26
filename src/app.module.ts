import { JwtTokenModule } from 'src/domains/jwt-token/jwt-token.module';
import { UserRepository } from 'src/domains/user-details/repositories/UserRepository';
import { DBAuthorizationMiddleware } from './middlewares/database.authorization.middleware';
import { ProductsModule } from './domains/products/products.module';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './domains/user-details/user.module';
import { JWTAuthorizationMiddleware } from './middlewares/authorization.middleware';
import { CartModule } from './domains/cart/cart.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
          type: 'mysql',
          host: configService.get('DB_URL'),
          port: +configService.get<number>('DB_PORT'),
          username: configService.get('DB_USER_NAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME'),
          entities: [__dirname + '/**/entities/*{.ts,.js}'],
          synchronize: true,
          migrationsRun: false
      }),
      inject: [ConfigService]
  }),
  ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `env/${process.env.NODE_ENV || 'development'}.env`
  }),
  UserModule,
  JwtTokenModule,
  ProductsModule,
  CartModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(JWTAuthorizationMiddleware, DBAuthorizationMiddleware)
        .exclude(
          { path: 'api/v1/user/getUserDetails', method: RequestMethod.POST},
          { path: 'api/v1/user/registerUser', method: RequestMethod.POST},
          { path: 'api/v1/products/getProducts', method: RequestMethod.POST},
          { path: 'api/v1/products/getProductById', method: RequestMethod.POST}
        )
        .forRoutes('*');
  }
}
