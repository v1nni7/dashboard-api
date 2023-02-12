import productService from "../services/productService";
import { Request, Response } from "express";

// ToDo: Alterar a tipagem do erro

async function createProduct(req: Request, res: Response) {
  try {
    const { role } = res.locals;
    await productService.createProduct(req.body, role);

    res.status(201).send("Product has been created");
  } catch (error: any) {
    res
      .status(error.status || 500)
      .send(error.message || "Internal server error");
  }
}

async function getAllProduts(req: Request, res: Response) {
  try {
    const response = await productService.getAllProducts();

    res.status(200).send(response);
  } catch (error: any) {
    res
      .status(error.status || 500)
      .send(error.message || "Internal server error");
  }
}

export default { createProduct, getAllProduts };
