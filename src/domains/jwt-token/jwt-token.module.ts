import { UserRepository } from '../user-details/repositories/UserRepository';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtTokenService } from './jwt-token.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
    TypeOrmModule.forFeature([UserRepository])
  ],
    providers: [JwtTokenService,ConfigModule],
    exports: [JwtTokenService]
})
export class JwtTokenModule {}
