import { JwtService } from '@nestjs/jwt';
import { AuthPayloadDto } from './dto/auth.dto';
import { Injectable } from '@nestjs/common';
import { UserService } from '@users/users.service';
import { User } from '@users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _userService: UserService,
  ) {}

  async validateUser({
    password,
    username,
  }: AuthPayloadDto): Promise<{ access_token: string } | null> {
    const user = await this._userService.getUser({ username });
    if (!user || !this._verifyCredentials(user, password))
      return Promise.resolve(null);

    const access_token = this._jwtService.sign({ username, id: user.id });
    return {
      access_token,
    };
  }

  private _verifyCredentials(user: User, password: string) {
    return user.comparePassword(password);
  }
}
