import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  phone: string;
  email: string;
  password: string;
  is_admin: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}
const userSchema: Schema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    is_admin: {
        type: Boolean,
    }
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model<IUser>('User',userSchema);
export default User;