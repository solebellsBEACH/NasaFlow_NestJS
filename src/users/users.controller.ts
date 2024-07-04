// src/user/user.controller.ts
import {
  Controller,
  Get,
  Param,
  Delete,
  UseGuards,
  Req,
  Post,
  Body,
} from '@nestjs/common';
import { UserService } from './users.service';
import { User } from './user.entity';
import { JwtAuthGuard } from '@auth/guards/jwt.guard';
import { AuthPayloadDto } from '@auth/dto/auth.dto';
import { ResponsePatternPipe } from '@shared/pipes/response-pattern/response-pattern.pipe';
import { ResponseTypes } from '@shared/interfaces/response-type.interfaces';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly _responsePatternPipe: ResponsePatternPipe,
  ) { }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post()
  create(@Body() body: AuthPayloadDto) {
    return this.userService
      .create(body)
      .then((data) => {
        return this._responsePatternPipe.transform({
          responseType: ResponseTypes.success,
          data,
          description: 'User created successfully',
        });
      })
      .catch((error) => {
        return this._responsePatternPipe.transform({
          responseType: ResponseTypes.error,
          data: error,
          error: true,
          description: error?.driverError?.detail,
        });
      });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Req() request: Request & { user: any }): Promise<User> {
    return this.userService.findOne(request.user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }
}
