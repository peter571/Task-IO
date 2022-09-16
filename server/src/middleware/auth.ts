import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, `${process.env.SECRET}`, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    next();
  });
};

export default authenticateToken;
