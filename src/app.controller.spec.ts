import { nodeEnviromentVariables } from './shared/constants/node-enviroment-variables';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/users.module';
import { DatabaseValues } from './data-source';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({ ...DatabaseValues, migrations: ['dist/database/migrations/*'], }),
        AuthModule, UserModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      nodeEnviromentVariables()
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
