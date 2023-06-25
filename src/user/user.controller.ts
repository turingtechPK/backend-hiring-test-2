import { Controller, Get, Post, Put, Delete, Param, Body, ValidationPipe, Headers, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.interface';
import { UserCreateDto } from './user.dto';
import { ApiBody, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) { }

  @Get(':id')
  @ApiResponse({ status: 200, description: "Get the user by id" })
  getUserById(@Param('id') id: number): User {
    return this.UserService.getUserById(id);
  }

  @Post()
  @ApiResponse({ status: 201, description: "Create a user", schema: { example: { id: 1, name: "Jane", email: "jane@doe.com", password: "qwerty" } } })
  @ApiBody({ description: 'Request body', type: UserCreateDto, examples: { example: { value: { name: "Jane", email: "jane@doe.com", password: "qwerty" } } } })
  createUser(@Body(ValidationPipe) user: UserCreateDto): User {
    let id = 1;
    if (this.UserService.getAllUser().length > 0) {
      id = this.UserService.getAllUser()[this.UserService.getAllUser().length - 1].id;
      id++;
    }
    let newUser: User = { ...user, id: id };
    return this.UserService.createUser(newUser);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: "Update the current user by id" })
  updateUser(@Headers('userId') userId: number, @Param('id') id: number, @Body() user: User): User {
    if (userId == id)
      return this.UserService.updateUser(id, user);
    else
      throw new UnauthorizedException()
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: "Delete the user by id" })
  deleteUser(@Headers('userId') userId: number, @Param('id') id: number): void {
    if (userId == id)
      this.UserService.deleteUser(id);
    else
      throw new UnauthorizedException()
  }
}
