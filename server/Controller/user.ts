import User from "../Models/User.model";

export const getAllUsers = async () => {
  const res = await User.find();
  return res;
};

export const getUserById = async (id: string) => {
  const res = await User.findById(id);
  return res;
};
