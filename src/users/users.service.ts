// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthPayloadDto } from '@auth/dto/auth.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(query?: any): Promise<User[]> {
    return this.userRepository.find();
  }

  getUser(query?: any): Promise<User | null> {
    return this.userRepository
      .find({
        where: query,
      })
      .then((users) => {
        return users[0];
      })
      .catch((err) => {
        return null;
      });
  }

  create(userBody: AuthPayloadDto) {
    const user = new User(userBody);
    return this.userRepository.save(user);
  }

  findOne(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }
}
