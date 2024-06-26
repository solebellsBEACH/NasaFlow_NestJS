import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/users.module';
import { DatabaseValues } from './data-source';

@Module({
  imports: [
    TypeOrmModule.forRoot(DatabaseValues),
    AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
