import { Router } from "express";
import userController from "../controllers/userController";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware";
import validateTokenMiddleware from "../middlewares/validateTokenMiddleware";
import { signUpSchema, signInSchema } from "../schema/userSchema";

const userRouter = Router();

userRouter.post(
  "/sign-up",
  validateSchemaMiddleware(signUpSchema),
  validateTokenMiddleware,
  userController.createUser
);

userRouter.post(
  "/sign-in",
  validateSchemaMiddleware(signInSchema),
  userController.signIn
);

userRouter.get("/list", validateTokenMiddleware, userController.getUsers);

userRouter.delete("/delete/:id", validateTokenMiddleware, userController.deleteUser);

export default userRouter;
