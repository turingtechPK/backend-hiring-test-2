import * as mongoose from 'mongoose';
import bcrypt from 'bcrypt';

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
  
export interface User extends mongoose.Document {

  username: string;
  password: string;
  firstName: string;
  lastname: string;
  accountType: 'admin' | 'user';
  
}