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
import { ResponsePatternService } from '@shared/services/response-pattern/response-pattern.service';

@Controller('users')
export class UserController {

  private readonly _entityName: string;

  constructor(
    private readonly userService: UserService,
    private readonly _responsePatternService: ResponsePatternService
  ) { }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post()
  create(@Body() body: AuthPayloadDto) {
    const response = this.userService
      .create(body)
    return this._responsePatternService.getResponse(response, this._entityName)

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
