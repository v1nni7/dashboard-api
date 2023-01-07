import productService from "../services/productService";
import { Request, Response } from "express";

async function createProduct(req: Request, res: Response) {
  try {
    await productService.createProduct(req.body);

    res.status(201).send("Product has been created");
  } catch (error: any) {
    res
      .status(error.status || 500)
      .send(error.message || "Internal server error");
  }
}

export default { createProduct };
