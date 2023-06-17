import * as mongoose from 'mongoose';
import bcrypt from 'bcrypt';

/* This code is defining a Mongoose schema for a user object with properties for username, password,
first name, last name, and account type. The schema is exported as a constant named UserSchema. The
username property is required and must be unique, while the password, first name, last name, and
account type properties are all required. The account type property is restricted to the values
"admin" or "user" using the enum keyword. */
export const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    accountType: { type: String, required: true, enum: ["admin", "user"] },
});
  
/* UserSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
}; */
  
/* This code is defining an interface named "User" that extends the Mongoose Document interface. The
User interface specifies the properties of a user object, including username, password, first name,
last name, and account type. The account type property is restricted to the values "admin" or "user"
using the union type syntax. This interface can be used to define the type of user objects in
TypeScript code. */
export interface User extends mongoose.Document {

  username: string;
  password: string;
  firstName: string;
  lastname: string;
  accountType: 'admin' | 'user';
  
}