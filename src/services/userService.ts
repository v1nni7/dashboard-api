import userRepository, { UserValues } from "../repositories/userRepository";
import { conflictError, unauthorizedError } from "../errors/errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Product } from "@prisma/client";

dotenv.config();

async function createUser(values: UserValues, role: number) {
  const user = await userRepository.findUserByEmail(values.email);

  if (user) {
    throw conflictError("Email already exists");
  }

  const password = bcrypt.hashSync(values.password, 12);
  const lastLogin = new Date();

  if (role < 2 || values.role > role) {
    throw unauthorizedError("You do not have permission");
  }

  await userRepository.createUser({ ...values, password, lastLogin });

  return;
}

async function signIn(values: UserValues) {
  const user = await userRepository.findUserByEmail(values.email);

  if (!user) {
    throw conflictError("Invalid email or password");
  }

  const isValidPassword = bcrypt.compareSync(values.password, user.password);

  if (!isValidPassword) {
    throw conflictError("Invalid email or password");
  }

  await userRepository.updateUser(user.id, { ...user, lastLogin: new Date() });

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET as string,
    {
      expiresIn: 86400 * 7,
    }
  );

  return { token, id: user.id, role: user.role };
}

async function getUsers() {
  const users = await userRepository.getUsers();

  return users;
}

async function deleteUser(id: number, role: number, userId: number) {
  const userToBeDeleted = await userRepository.findUserById(id);

  if (!userToBeDeleted) {
    throw conflictError("User not found");
  }

  if (userToBeDeleted?.id === userId) {
    throw conflictError("You cannot delete yourself");
  }

  if (role < 3 || userToBeDeleted.role > role || userId === id) {
    throw unauthorizedError("You do not have permission");
  }

  await userRepository.deleteUser(id);

  return { message: `User #${id} has been deleted` };
}

export default { createUser, signIn, getUsers, deleteUser };
