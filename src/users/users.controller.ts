// src/user/user.controller.ts
import { Controller, Get, Param, Delete, UseGuards, Req, Post, Body } from '@nestjs/common';
import { UserService } from './users.service';
import { User } from './user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { AuthPayloadDto } from 'src/auth/dto/auth.dto';


@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Post()
    create(@Body() body: AuthPayloadDto) {
        return this.userService.create(body).then(user => {
            console.log(user);
            return { user }
        }).catch(error => {
            console.log(error);
            return { description: error?.driverError?.detail || 'Error !!', error }
        })


    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    findOne(@Req() request: Request & { user: any }): Promise<User> {
        return this.userService.findOne(request.user.id);
    }

    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
        return this.userService.remove(id);
    }
}
