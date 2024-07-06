import { JwtService } from '@nestjs/jwt';
import { AuthPayloadDto } from './dto/auth.dto';
import { Injectable } from '@nestjs/common';
import { UserService } from '@users/users.service';
import { User } from '@users/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly _jwtService: JwtService, private readonly _userService: UserService,) { }

  async validateUser({ password, username }: AuthPayloadDto) {
    const user = await this._userService.getUser({ username })
    if (!user) return null;
    if (this._verifyCredentials(user, password)) {
      const access_token = this._jwtService.sign({ username, id: user.id });
      return {
        access_token,
      };
    }
  }

  private _verifyCredentials(user: User, password: string) {
    return user.comparePassword(password)
  }
}
