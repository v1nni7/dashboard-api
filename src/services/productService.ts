import productRepository, { ProductValues } from "../repositories/productRepository";

async function createProduct(values: ProductValues) {
  await productRepository.createProduct(values);

  return;
}

export default { createProduct };
