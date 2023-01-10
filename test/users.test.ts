import { faker } from "@faker-js/faker";
import request from "supertest";
import app from "../src/app";
import { createUser, createUserAdmin } from "./factories/userFactory";
import { generateToken } from "./helpers/authenticationHelper";
import { cleanUsers } from "./helpers/databaseHelper";

const server = request(app);

beforeEach(async () => {
  await cleanUsers();
});

describe("POST /users/sign-up", () => {
  describe("when the user body is invalid", () => {
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

  describe("when the user body is valid", () => {
    const user = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: 0,
    };

    it("should return 401 if user is not allowed to create users", async () => {
      const userNotAllowed = await createUser();
      const token = generateToken(userNotAllowed);

      const response = await server
        .post("/users/sign-up")
        .send(user)
        .set({ authorization: `Bearer ${token}` });

      expect(response.status).toBe(401);
    });

    it("should return 401 if user has try create top level user role", async () => {
      const userAdmin = await createUserAdmin();
      const token = generateToken(userAdmin);

      const response = await server
        .post("/users/sign-up")
        .send({ ...user, role: 4 })
        .set({ authorization: `Bearer ${token}` });

      expect(response.status).toBe(401);
    });

    it("should return 201 if user created sucessfully", async () => {
      const userAdmin = await createUserAdmin();
      const token = await generateToken(userAdmin);

      const response = await server
        .post("/users/sign-up")
        .send(user)
        .set({ authorization: `Bearer ${token}` });

      expect(response.status).toBe(201);
    });
  });
});
