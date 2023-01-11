import prisma from "../../src/database";

async function cleanUsers() {
  await prisma.user.deleteMany({});
}

async function cleanProducts() {
  await prisma.user.deleteMany({});
}

export { cleanUsers, cleanProducts };
