import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './users.service';
import { AuthPayloadDto } from '../auth/dto/auth.dto';


const mockUserRepository = {
  find: jest.fn(),
  findOneBy: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
};

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users: User[] = [{ id: 1, username: 'user1', password: '123' }];
      mockUserRepository.find.mockReturnValue(users);

      const result = await service.findAll();

      expect(result).toEqual(users);
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const newUser: AuthPayloadDto = { username: 'newuser', password: 'password' };
      const savedUser: User = { id: 1, ...newUser };
      mockUserRepository.save.mockResolvedValue(savedUser);

      const result = await service.create(newUser);

      expect(result).toEqual(savedUser);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const userId = 1;
      const user: User = { id: userId, username: 'user1', password: 'password1' };
      mockUserRepository.findOneBy.mockResolvedValue(user);

      const result = await service.findOne(userId);

      expect(result).toEqual(user);
    });

    it('should return undefined if user not found', async () => {
      const userId = 999;
      mockUserRepository.findOneBy.mockResolvedValue(undefined);

      const result = await service.findOne(userId);

      expect(result).toBeUndefined();
    });
  });

  describe('remove', () => {
    it('should remove a user by id', async () => {
      const userId = 1;
      mockUserRepository.delete.mockResolvedValue({ affected: 1 });

      await service.remove(userId);

      expect(mockUserRepository.delete).toHaveBeenCalledWith(userId);
    });
  });
});
