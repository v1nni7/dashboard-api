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

async function updateUser(id: number, values: UserValues) {
  return prisma.user.update({
    where: {
      id,
    },
    data: values,
  });
}

export default {
  findUserById,
  findUserByEmail,
  getUsers,
  createUser,
  deleteUser,
  updateUser,
};
