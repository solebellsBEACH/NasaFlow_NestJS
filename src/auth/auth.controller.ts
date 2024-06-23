import {
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LocalGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor() { }

  @Post('login')
  @UseGuards(LocalGuard)
  login(@Req() request: Request & { user: any }) {
    return request.user || {};
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  status(@Req() request: Request & { user: any }) {
    return request.user || {};
  }
}
