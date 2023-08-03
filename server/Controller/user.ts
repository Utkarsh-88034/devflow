import bcrypt from "bcryptjs";
import User from "../Models/User.model";

export const getAllUsers = async () => {
  const res = await User.find();
  return res;
};

export const getUserById = async (id: string) => {
  const res = await User.findById(id);
  return res;
};

export const registerNewUser = async (args: any) => {
  const password = await bcrypt.hash(args.password, 10);
  const user = await User.create({
    name: args.name,
    password: password,
    userName: args.userName,
    role: args.role,
    email: args.email,
  });

  return user;
};
