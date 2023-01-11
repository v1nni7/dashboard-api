import { faker } from "@faker-js/faker";
import request from "supertest";
import app from "../src/app";
import { cleanProducts } from "./helpers/databaseHelper";
import { createUser, createUserAdmin } from "./factories/userFactory";
import { createProduct } from "./factories/productsFactory";
import { generateToken } from "./helpers/authenticationHelper";

const server = request(app);

beforeEach(async () => {
  await cleanProducts();
});

describe("POST /products/create", () => {
  const randomCode = Math.random().toString(36).substring(7);
  const priceToNumber = Number(faker.commerce.price());

  const product = {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    brand: faker.commerce.productName(),
    category: faker.commerce.productName(),
    image: faker.image.imageUrl(),
    code: randomCode,
    price: priceToNumber,
    stock: faker.datatype.number(100),
  };

  describe("when the product body is invalid", () => {
    it("should return 400 if body is invalid", async () => {
      const user = await createUser();
      const token = generateToken(user);

      const response = await server
        .post("/products/create")
        .send({ ...product, name: "" })
        .set({ authorization: `Bearer ${token}` });

      expect(response.status).toBe(400);
    });

    it("should return 400 if price not a number", async () => {
      const user = await createUser();
      const token = generateToken(user);

      const response = await server
        .post("/products/create")
        .send({ ...product, price: "asdasd" })
        .set({ authorization: `Bearer ${token}` });

      expect(response.status).toBe(400);
    });

    it("should return 400 if price less than 0", async () => {
      const user = await createUser();
      const token = generateToken(user);

      const response = await server
        .post("/products/create")
        .send({ ...product, price: -2000 })
        .set({ authorization: `Bearer ${token}` });

      expect(response.status).toBe(400);
    });

    it("should return 400 if price equal to 0", async () => {
      const user = await createUser();
      const token = generateToken(user);

      const response = await server
        .post("/products/create")
        .send({ ...product, price: 0 })
        .set({ authorization: `Bearer ${token}` });

      expect(response.status).toBe(400);
    });

    it("should return 400 if stock less than 0", async () => {
      const user = await createUser();
      const token = generateToken(user);

      const response = await server
        .post("/products/create")
        .send({ ...product, stock: -2 })
        .set({ authorization: `Bearer ${token}` });

      expect(response.status).toBe(400);
    });

    it("should return 400 if stock equal to 0", async () => {
      const user = await createUser();
      const token = generateToken(user);

      const response = await server
        .post("/products/create")
        .send({ ...product, stock: 0 })
        .set({ authorization: `Bearer ${token}` });

      expect(response.status).toBe(400);
    });
  });

  describe("when the product body is valid", () => {
    it("should return 401 if user is not allowed to create products", async () => {
      const user = await createUser();
      const token = await generateToken(user);

      const response = await server
        .post("/products/create")
        .send(product)
        .set({ authorization: `Bearer ${token}` });

      expect(response.status).toBe(401);
    });

    it("should return 409 if product code is duplicated", async () => {
      const user = await createUserAdmin();
      const token = await generateToken(user);
      const createdProduct = await createProduct();

      const response = await server
        .post("/products/create")
        .send({ ...product, code: createdProduct.code })
        .set({ authorization: `Bearer ${token}` });

      expect(response.status).toBe(409);
    });

    it("should return 401 if token is not provided", async () => {
      const response = await server
        .post("/products/create")
        .send(product)
        .set({ authorization: `Bearer ` });

      expect(response.status).toBe(401);
    });

    it("should return 200 if user is allowed to create product", async () => {
      const user = await createUserAdmin();
      const token = await generateToken(user);

      const response = await server
        .post("/products/create")
        .send(product)
        .set({ authorization: `Bearer ${token}` });

      expect(response.status).toBe(201);
    });
  });
});

describe("GET /products", () => {
  describe("when token is invalid", () => {
    it("should return 401 if token not provided", async () => {
      const response = await server
        .get("/products")
        .set({ authorization: `Bearer 1nv4l1dT0k3n` });

      expect(response.status).toBe(401);
    });
  });

  describe("when token is valid", () => {
    it("should return 200 if toked has provided", async () => {
      const user = await createUser();
      const token = await generateToken(user);

      const response = await server
        .get("/products")
        .set({ authorization: `Bearer ${token}` });

      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            description: expect.any(String),
            brand: expect.any(String),
            category: expect.any(String),
            image: expect.any(String),
            code: expect.any(String),
            price: expect.any(Number),
            rating: expect.any(Number),
            stock: expect.any(Number),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          }),
        ])
      );
    });
  });
});
