import { Router } from "express";
import validateTokenMiddleware from "../middlewares/validateTokenMiddleware";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware";
import { createProductSchema } from "../schema/productSchema";
import productController from "../controllers/productController";

const productRouter = Router();

productRouter.post(
  "/create",
  validateTokenMiddleware,
  validateSchemaMiddleware(createProductSchema),
  productController.createProduct
);

export default productRouter;
