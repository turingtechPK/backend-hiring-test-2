import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "src/models/User.model";
import { UserService } from "./User.service";
import { UserController } from '../controllers/User.controller'

@Module({
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
    controllers: [UserController],
    providers: [UserService]

})
export class UserModule {}