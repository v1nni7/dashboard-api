import { faker } from "@faker-js/faker";
//import { Product } from "@prisma/client";
import prisma from "../../src/database";

async function createProduct() {
  const randomCode = Math.random().toString(36).substring(7);
  const priceToNumber = Number(faker.commerce.price());

  return await prisma.product.create({
    data: {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      brand: faker.commerce.productName(),
      category: faker.commerce.productName(),
      image: faker.image.imageUrl(),
      code: randomCode,
      price: priceToNumber,
      rating: faker.datatype.number(5),
      stock: faker.datatype.number(100),
    },
  });
}

export { createProduct };
