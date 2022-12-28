import { Request, Response } from "express";
import userService from "../services/userService";

async function createUser(req: Request, res: Response) {
  try {
    await userService.createUser(req.body);

    res.status(201).send("User has been created");
  } catch (error) {
    res.status(500).send(error);
  }
}

async function signIn(req: Request, res: Response) {
  try {
    const userToken = await userService.validateSignIn(req.body);

    res.status(200).send(userToken);
  } catch (error: any) {
    console.log(error.status)
    res.status(error.status || 500).send(error.message || "Internal server error");
  }
}

export default { createUser, signIn };
