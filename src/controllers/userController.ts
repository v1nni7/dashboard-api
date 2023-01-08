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

export default { createUser, signIn };
