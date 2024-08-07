import { ResponsePattern } from '../shared/pipes/response-pattern/response-pattern.interface';

import { AuthPayloadDto } from '../auth/dto/auth.dto';
import { ResponsePatternService } from '../shared/services/response-pattern/response-pattern.service';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from './user.entity';
import { DeleteResult } from 'typeorm';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;
  let responsePatternService: ResponsePatternService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            findAll: jest.fn(),
            create: jest.fn(),
            findOne: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: ResponsePatternService,
          useValue: {
            getResponse: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
    responsePatternService = module.get<ResponsePatternService>(ResponsePatternService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = [{ id: "abcd1234", username: 'Test User' }] as User[];
      const responsePattern: ResponsePattern<any> = {
        error: true,
        description: 'success', data: result
      };
      jest.spyOn(userService, 'findAll').mockResolvedValue(result);
      jest.spyOn(responsePatternService, 'getResponse').mockResolvedValue(responsePattern);

      expect(await controller.findAll()).toBe(responsePattern);
    });
  });

  describe('create', () => {
    it('should return a response pattern for create', async () => {
      const dto: AuthPayloadDto = { username: 'user1234', password: '1234' };
      const createdUser = { id: "abcd1234", username: 'user1234', password: '1234' } as AuthPayloadDto & User
      const responsePattern: ResponsePattern<any> = {
        error: true,
        description: 'success', data: createdUser
      };

      jest.spyOn(userService, 'create').mockResolvedValue(createdUser);
      jest.spyOn(responsePatternService, 'getResponse').mockResolvedValue(responsePattern);

      expect(await controller.create(dto)).toBe(responsePattern);
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const user = { id: "abcd1234", username: 'Test User' } as User;
      const responsePattern: ResponsePattern<any> = {
        error: true,
        description: 'success', data: user
      };
      jest.spyOn(userService, 'findOne').mockResolvedValue(user);
      jest.spyOn(responsePatternService, 'getResponse').mockResolvedValue(responsePattern);

      expect(await controller.findOne({ user: { id: "abcd1234" } } as any)).toBe(responsePattern);
    });
  });

  describe('remove', () => {
    it('should return undefined', async () => {
      const id = '1';
      jest.spyOn(userService, 'remove').mockResolvedValue({} as Promise<DeleteResult>);

      expect(await controller.remove(id)).toBeUndefined();
    });
  });
});
