import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({
    secret: '1234',
    signOptions: {
      expiresIn: '2h'
    },
  })],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
