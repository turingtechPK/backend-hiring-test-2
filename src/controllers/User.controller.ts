import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { UserService } from "../User/User.service";

/* This is a TypeScript class that defines a UserController with methods for user sign up and login. */
@Controller('user')
export class UserController{
    /**
     * This is a constructor function that takes in a UserService parameter and sets it as a private
     * readonly property.
     * @param {UserService} userService - The `userService` parameter is a private readonly property of
     * the class that is of type `UserService`. It is likely being injected into the class through
     * dependency injection and can be used to access the methods and properties of the `UserService`
     * class.
     */
    constructor (private readonly userService: UserService) {}

    /* This is a method in a NestJS controller that handles a POST request to the '/signup' endpoint.
    It takes in data from the request body (username, firstname, lastname, password, and account
    type), passes it to the UserService's signup method, and returns the resulting user object. */
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

    /* This is a method in a NestJS controller that handles a GET request to the '/login' endpoint. It
    takes in data from the request body (username and password), passes it to the UserService's
    login method, and returns the resulting user object. The `@Get('login')` decorator specifies the
    HTTP method and endpoint that this method will handle. The `@Body('name')` and `@Body('pword')`
    decorators specify that the `username` and `password` parameters should be extracted from the
    request body. */
    @Get('login')
    async userLogin(
        @Body('name') username: string,
        @Body('pword') password: string,
    ) {
        const currUser = await this.userService.login(username, password);
        return currUser
    }
} 