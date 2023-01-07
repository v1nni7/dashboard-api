import app from "../src/app"; 
import request from "supertest";
import { createProduct } from "./factories/productsFactory";

const server = request(app);

describe("POST /products/create", () => {
  it("should return 201 if product is created", async () => {
    const response = await server.post("/products/create").send(await createProduct());

    expect(response.status).toBe(201);
  })
})