import prisma from "../../src/database";

async function cleanUsers() {
  await prisma.user.deleteMany({});
}

export { cleanUsers };
