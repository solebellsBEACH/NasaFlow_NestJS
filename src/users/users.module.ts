import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { SharedModule } from '@shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), SharedModule],
  exports: [UserService, TypeOrmModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
