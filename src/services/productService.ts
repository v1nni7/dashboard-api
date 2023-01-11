import roleLevel from "../utils/userLevel";
import productRepository, {
  ProductValues,
} from "../repositories/productRepository";
import {
  conflictError,
  unauthorizedError,
  notFoundError,
} from "../errors/errors";

async function createProduct(values: ProductValues, role: number) {
  if (role < roleLevel.manager) {
    throw unauthorizedError("You are not authorized to create a product");
  }

  const isProductCreated = await productRepository.findProductByCode(
    values.code
  );

  if (isProductCreated.length > 0) {
    throw conflictError("Product already exists");
  }

  await productRepository.createProduct(values);

  return;
}

async function getAllProducts() {
  const products = await productRepository.getAllProducts();

  if (products.length === 0) {
    throw notFoundError("No products found");
  }

  return products;
}

export default { createProduct, getAllProducts };
