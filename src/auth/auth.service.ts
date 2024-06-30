import { JwtService } from '@nestjs/jwt';
import { AuthPayloadDto } from './dto/auth.dto';
import { Injectable } from '@nestjs/common';

const fakeUsers = [
  {
    id: 1,
    username: 'Lucas Xavier',
    password: '1234',
  },
  {
    id: 2,
    username: 'Gabriel Medina',
    password: '1234',
  },
];

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  validateUser({ password, username }: AuthPayloadDto) {
    const findUsers = fakeUsers.find((user) => user.username === username);
    if (!findUsers) return null;
    if (password === findUsers.password) {
      const { password, ...user } = findUsers;
      const access_token = this.jwtService.sign(user);
      return {
        access_token,
      };
    }
  }
}
