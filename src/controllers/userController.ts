import { Request, Response } from "express";
import userService from "../services/userService";

async function createUser(req: Request, res: Response) {
  try {
    const body = req.body;
    const { role } = res.locals;

    await userService.createUser(body, role);

    res.status(201).send("User has been created");
  } catch (error: any) {
    res
      .status(error.status || 500)
      .send(error.message || "Internal server error");
  }
}

async function signIn(req: Request, res: Response) {
  try {
    const userToken = await userService.signIn(req.body);

    res.status(200).send(userToken);
  } catch (error: any) {
    res
      .status(error.status || 500)
      .send(error.message || "Internal server error");
  }
}

async function getUsers(req: Request, res: Response) {
  try {
    const users = await userService.getUsers();

    res.status(200).send(users);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
}

async function deleteUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { role, userId } = res.locals;

    const response = await userService.deleteUser(Number(id), role, userId);

    res.status(200).send(response);
  } catch (error: any) {
    res
      .status(error.status || 500)
      .send(error.message || "Internal server error");
  }
}

export default { createUser, signIn, getUsers, deleteUser };
