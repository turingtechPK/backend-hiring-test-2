import mongoose from 'mongoose';

// An interface that describes the properties
// that are requried to create a new User
interface UserAttrs {
  accountID: number;
  firstName: string;
  lastName: string;
  cnic: number;
  amount: number;
  dob: string;
  pin: string;
}

interface transactionHistory {
  trasnferTo: number;
  transferFrom: number;
  amountTransferred: number;
  transactionType: string;
  transactionTime: string;
}

// An interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
    accountID: number;
    firstName?: string;
    lastName?: string;
    cnic: number;
    amount: number;
    dob?: string;
    email?: string;
    phoneNumber: string;
    pin: string;
    transactionHistory: transactionHistory[];
}

const userSchema = new mongoose.Schema(
  {
    accountID: {
      type: Number,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      default: null,
    },
    lastName: {
      type: String,
      required: true,
      default: null,
    },
    dob: {
      type: String,
      required: true,
      default: null,
    },
    email: {
      type: String,
      required: false,
      default: null,
    },
    phoneNumber: {
      type: String,
      required: false,
      default: null,
    },
    pin: {
      type: String,
      required: true,
      default: null,
    },
    cnic: {
      type: Number,
      required: true,
      default: null,
    },
    amount: {
      type: Number,
      required: true,
      default: null,
    },
    transactionHistory: {
      type: Array,
      required: false,
      default: null,
    },
    
  },
  {
    toJSON: {
      getters: true,
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
