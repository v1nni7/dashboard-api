import { Router } from "express";

const userRouter = Router();

userRouter.post("/sign-up", (req, res) => {
  res.status(201).send("User created");
});

export default userRouter;