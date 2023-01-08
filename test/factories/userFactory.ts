import { faker } from "@faker-js/faker";
import prisma from "../../src/database";

async function createUser() {
  return await prisma.user.create({
    data: {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      lastLogin: new Date(),
      role: 0,
    },
  });
}

async function createUserAdmin() {
  return await prisma.user.create({
    data: {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      lastLogin: new Date(),
      role: 2,
    },
  });
}

export { createUser, createUserAdmin };
                