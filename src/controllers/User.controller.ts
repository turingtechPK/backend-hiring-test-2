import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { UserService } from "../User/User.service";

@Controller('user')
export class UserController{
    constructor (private readonly userService: UserService) {}

    @Post('signup')
    async userSignUp (
        @Body('uname') username: string,
        @Body('fname') firstname: string,
        @Body('lname') lastname: string,
        @Body('pword') password: string,
        @Body('type') accType: 'admin' | 'user'
    ){
        const user = await this.userService.signup(username, password, firstname, lastname, accType);
        return user;
    }   

    @Get('login')
    async userLogin(
        @Body('name') username: string,
        @Body('pword') password: string,
    ) {
        const currUser = await this.userService.login(username, password);
        return currUser
    }
} 