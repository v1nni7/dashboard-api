import { faker } from "@faker-js/faker";
import prisma from "../src/database";
import bcrypt from "bcrypt";

const main = async () => {
  await prisma.user.createMany({
    data: [
      {
        name: "Vinicius",
        role: 5,
        email: "vini@gmail.com",
        password: bcrypt.hashSync("123456", 12),
        lastLogin: faker.date.past(),
      },
      {
        name: faker.name.firstName(),
        role: faker.datatype.number(5),
        email: faker.internet.email(),
        password: bcrypt.hashSync(faker.internet.password(), 12),
        lastLogin: faker.date.past(),
      },
      {
        name: faker.name.firstName(),
        role: faker.datatype.number(5),
        email: faker.internet.email(),
        password: bcrypt.hashSync(faker.internet.password(), 12),
        lastLogin: faker.date.past(),
      },
      {
        name: faker.name.firstName(),
        role: faker.datatype.number(5),
        email: faker.internet.email(),
        password: bcrypt.hashSync(faker.internet.password(), 12),
        lastLogin: faker.date.past(),
      },
      {
        name: faker.name.firstName(),
        role: faker.datatype.number(5),
        email: faker.internet.email(),
        password: bcrypt.hashSync(faker.internet.password(), 12),
        lastLogin: faker.date.past(),
      },
      {
        name: faker.name.firstName(),
        role: faker.datatype.number(5),
        email: faker.internet.email(),
        password: bcrypt.hashSync(faker.internet.password(), 12),
        lastLogin: faker.date.past(),
      },
      {
        name: faker.name.firstName(),
        role: faker.datatype.number(5),
        email: faker.internet.email(),
        password: bcrypt.hashSync(faker.internet.password(), 12),
        lastLogin: faker.date.past(),
      },
      {
        name: faker.name.firstName(),
        role: faker.datatype.number(5),
        email: faker.internet.email(),
        password: bcrypt.hashSync(faker.internet.password(), 12),
        lastLogin: faker.date.past(),
      },
      {
        name: faker.name.firstName(),
        role: faker.datatype.number(5),
        email: faker.internet.email(),
        password: bcrypt.hashSync(faker.internet.password(), 12),
        lastLogin: faker.date.past(),
      },
      {
        name: faker.name.firstName(),
        role: faker.datatype.number(5),
        email: faker.internet.email(),
        password: bcrypt.hashSync(faker.internet.password(), 12),
        lastLogin: faker.date.past(),
      },
      {
        name: faker.name.firstName(),
        role: faker.datatype.number(5),
        email: faker.internet.email(),
        password: bcrypt.hashSync(faker.internet.password(), 12),
        lastLogin: faker.date.past(),
      },
    ],
  });
};

main()
  .then(() => {
    console.log("Database seeded successfully");
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
