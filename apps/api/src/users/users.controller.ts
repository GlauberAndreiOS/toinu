import {
  Controller,
  Post,
  Delete,
  Body,
  Param,
  Get,
  UseGuards,
} from '@nestjs/common';
import { User } from '@toinu/shared-types';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersResource } from './users.resource';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return UsersResource.formatMany(await this.usersService.findAll());
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User | null> {
    return UsersResource.format(await this.usersService.findOne(id));
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return UsersResource.format(await this.usersService.create(createUserDto));
  }

  @Post(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<boolean> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<boolean> {
    return this.usersService.delete(id);
  }
}
