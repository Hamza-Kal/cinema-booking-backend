import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { ICreateUser, ILoginUser } from "./dto";
import mongoose from "mongoose";
import User from "./db/model";
import { UserErrors } from "./error-services";

class UserService {
  private userError: UserErrors;

  constructor() {
    this.userError = new UserErrors();
  }

  private async findByName(name: string, throwError?: boolean) {
    const user = await User.findOne({ name });
    if (!user && throwError) {
      throw this.userError.notFound();
    }
    return user;
  }

  // Create a new user
  async create({
    dto,
  }: {
    dto: ICreateUser;
    session?: mongoose.mongo.ClientSession;
  }) {
    const existingUser = await this.findByName(dto.name);
    if (existingUser) {
      throw this.userError.alreadyExists();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(dto.password, salt);
    dto.password = hashedPassword;

    const user = new User(dto);
    return await user.save();
  }

  // Login functionality
  async login({
    dto,
  }: {
    dto: ILoginUser;
    session?: mongoose.mongo.ClientSession;
  }) {
    const user = await this.findByName(dto.name);

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw this.userError.invalidCredentials();
    }
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );
    return {
      message: "Login successful",
      token,
    };
  }

  // Get all users functionality
  async getAll() {
    const users = await User.find({}, "-password"); // The `-password` will exclude the password field
    if (!users || users.length === 0) {
      throw this.userError.notFound();
    }
    return users;
  }
}

export default UserService;
