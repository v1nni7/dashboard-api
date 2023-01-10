import { Product } from "@prisma/client";
import prisma from "../database";

export type ProductValues = Omit<Product, "id">;

async function createProduct(values: ProductValues) {
  return await prisma.product.create({
    data: { ...values, rating: 0 },
  });
}

async function findProductByName(name: string) {
  return await prisma.product.findMany({
    where: {
      name,
    },
  });
}

export default { createProduct };
