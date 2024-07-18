import { DatabaseValues, secretKey } from './../data-source';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AuthService } from './auth.service';
import { UserModule } from '../users/users.module';
import { User } from '../users/user.entity';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserService } from '../users/users.service';

describe('AuthService', () => {
  let service: AuthService;
  let dataSource: DataSource;
  let userService: UserService
  let jwtService: JwtService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          ...DatabaseValues,
          synchronize: true,
        }),
        UserModule,
        PassportModule,
        JwtModule.register({
          secret: secretKey,
          signOptions: {
            expiresIn: '2h',
          },
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService, LocalStrategy, JwtStrategy],
    }).compile();

    service = module.get<AuthService>(AuthService);
    dataSource = module.get<DataSource>(DataSource);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(async () => {
    await dataSource.destroy();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    const userDto = {
      password: "1234", username: "User"
    }
    it('should be return null if not user', () => {
      jest.spyOn(userService, 'getUser').mockResolvedValue(Promise.resolve(null));
      const result = service.validateUser(userDto);

      expect(result).toEqual(Promise.resolve(null))
    })

    it('should be return null if not _verifyCredentials', () => {
      const user = new User(userDto);
      jest.spyOn(user, 'comparePassword').mockResolvedValue(Promise.resolve(false));
      jest.spyOn(userService, 'getUser').mockResolvedValue(Promise.resolve(user));
      const result = service.validateUser(userDto);

      expect(result).toEqual(Promise.resolve(null))
    })

    it('should be return access_token if user and _verifyCredentials is valid', () => {
      const user = new User(userDto);
      const access_token: any = "valid_access_token"
      jest.spyOn(user, 'comparePassword').mockResolvedValue(Promise.resolve(true));
      jest.spyOn(userService, 'getUser').mockResolvedValue(Promise.resolve(user));
      jest.spyOn(jwtService, 'sign').mockResolvedValue(Promise.resolve({ access_token }) as never);
      const result = service.validateUser(userDto);

      expect(result).toEqual(Promise.resolve({ access_token }))
    })

  })
});
