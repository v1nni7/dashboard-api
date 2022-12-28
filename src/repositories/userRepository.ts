import { User } from "@prisma/client";
import prisma from "../database";

export type UserValues = Omit<User, "id">;

async function createUser(values: UserValues) {
  return await prisma.user.create({
    data: values,
  });
}

async function findUserByEmail(email: string) {
  return await prisma.user.findFirst({
    where: {
      email,
    },
  });
}

export default { createUser, findUserByEmail };
