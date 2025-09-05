import User, { IUser, IUserDoc } from "../models/user.model";
import { generateToken } from "../utils/generateToken";

export const registerUserService = async (name: string, email: string, password: string) => {
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("Email already exists");
  }
  const user = await User.create({ name, email, password });
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user.id)
  };
};

export const loginUserService = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email");
  }
  if (!(await user.matchPassword(password))) {
    throw new Error("Invalid password");
  }
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user.id)
  };
};
