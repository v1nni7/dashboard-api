import { faker } from "@faker-js/faker";
import jwt from "jsonwebtoken";
import request from "supertest";
import app from "../src/app";
import { createUser, createUserAdmin } from "./factories/userFactory";
import { generateToken } from "./helpers/authenticationHelper";

const server = request(app);

describe("POST /users/sign-up", () => {
  describe("when body tests are invalid", () => {
    const invalidUser = {
      name: "",
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: 0,
    };

    it("should return 400 if body field is empty", async () => {
      const adminUser = await createUserAdmin();
      const token = await generateToken(adminUser);

      const response = await server
        .post("/users/sign-up")
        .send(invalidUser)
        .set({ authorization: `Bearer ${token}` });

      expect(response.status).toBe(400);
    });

    it("should return 400 if body is not provided", async () => {
      const adminUser = await createUserAdmin();
      const token = await generateToken(adminUser);

      const response = await server
        .post("/users/sign-in")
        .set({ authentication: `Beraer ${token}` });

      expect(response.status).toBe(400);
    });
  });

  describe("when the user does not have permission", () => {
    const newUser = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: 4,
    };

    it("should return 401 if user is not allowed to create users", async () => {
      const userNotAllowed = await createUser();
      const token = generateToken(userNotAllowed);

      const response = await server
        .post("/users/sign-up")
        .send(newUser)
        .set({ authorization: `Bearer ${token}` });

      expect(response.status).toBe(401);
    });

    it("should return 401 if user has try create top level user role", async () => {
      const userAdmin = await createUserAdmin();
      const token = generateToken(userAdmin);

      const response = await server
        .post("/users/sign-up")
        .send(newUser)
        .set({ authorization: `Bearer ${token}` });

      expect(response.status).toBe(401);
    });
  });
});
