import { Router } from "express";
import userController from "../controllers/userController";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware";
import { signUpSchema, signInSchema } from "../schema/userSchema";

const userRouter = Router();

userRouter.post(
  "/sign-up",
  validateSchemaMiddleware(signUpSchema),
  userController.createUser
);

userRouter.post(
  "/sign-in",
  validateSchemaMiddleware(signInSchema),
  userController.signIn
);

export default userRouter;
