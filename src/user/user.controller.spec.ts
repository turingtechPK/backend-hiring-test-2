import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.interface';
import { UserCreateDto } from './user.dto'
import { UnauthorizedException } from '@nestjs/common';

describe('UserController', () => {
    let controller: UserController;
    let userService: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [UserService],
        }).compile();
        controller = module.get<UserController>(UserController);
        userService = module.get<UserService>(UserService);
    });

    describe('getUserById', () => {
        it('should return the user with the specified id', () => {
            const user: User = {
                id: 1,
                name: 'John Doe',
                email: 'john@example.com',
                password: 'password123',
            };
            jest.spyOn(userService, 'getUserById').mockReturnValue(user);
            expect(controller.getUserById(1)).toEqual(user);
        });
    });

    describe('createUser', () => {
        it('should create a new user', () => {
            const createUserDto: UserCreateDto = {
                name: 'Jane Smith',
                email: 'jane@example.com',
                password: 'password456',
            };
            const createdUser: User = {
                id: 1,
                name: 'Jane Smith',
                email: 'jane@example.com',
                password: 'password456',
            };
            jest.spyOn(userService, 'getAllUser').mockReturnValue([]);
            jest.spyOn(userService, 'createUser').mockReturnValue(createdUser);
            expect(controller.createUser(createUserDto)).toEqual(createdUser);
        });
    });

    describe('updateUser', () => {
        it('should update the user with the specified id', () => {
            const updatedUser: User = {
                id: 1,
                name: 'Updated Name',
                email: 'updated@example.com',
                password: 'updated123',
            };
            jest.spyOn(userService, 'updateUser').mockReturnValue(updatedUser);
            expect(controller.updateUser(1, 1, updatedUser)).toEqual(updatedUser);
        });

        it('should throw an UnauthorizedException when userId does not match id', () => {
            expect(() => {
                controller.updateUser(2, 1, {} as User);
            }).toThrowError(UnauthorizedException);
        });
    });

    describe('deleteUser', () => {
        it('should delete the user with the specified id', () => {
            const userId = 1;
            expect(() => {
                controller.deleteUser(userId, userId);
            }).not.toThrow();
        });

        it('should throw an UnauthorizedException when userId does not match id', () => {
            expect(() => {
                controller.deleteUser(2, 1);
            }).toThrowError(UnauthorizedException);
        });
    });
});