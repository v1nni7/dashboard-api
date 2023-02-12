import { User } from "@prisma/client";
import prisma from "../database";

export type UserValues = Omit<User, "id">;

async function createUser(values: UserValues) {
  return await prisma.user.create({
    data: values,
  });
}

async function findUserById(id: number) {
  return await prisma.user.findFirst({
    where: {
      id,
    },
  });
}

async function findUserByEmail(email: string) {
  return await prisma.user.findFirst({
    where: {
      email,
    },
  });
}

async function getUsers() {
  return await prisma.user.findMany();
}

async function deleteUser(id: number) {
  return await prisma.user.delete({
    where: {
      id,
    },
  });
}

export default { createUser, findUserById, findUserByEmail, getUsers, deleteUser };
