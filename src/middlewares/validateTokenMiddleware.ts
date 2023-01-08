import dotenv from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

dotenv.config();

function validateTokenMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  try {
    if (!token) {
      return res.status(401).send("Unauthorized");
    }

    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    res.locals.role = decodedToken.role;
    res.locals.userId = decodedToken.id;

    next();
  } catch (error) {
    return res.status(401).send("Unauthorized");
  }
}

export default validateTokenMiddleware;
