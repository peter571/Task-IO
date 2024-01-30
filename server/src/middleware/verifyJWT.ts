import { Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { RequestWithUserInfo } from "../types";

interface UserInfo {
  userInfo: {
    name: string;
    email: string;
    userId: string;
  }
}

const verifyJWT = async (
  req: RequestWithUserInfo,
  res: Response,
  next: NextFunction
) => {

  const authHeader = req.headers["authorization"] || req.headers["Authorization"] as string;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(
    token,
    `${process.env.ACCESS_TOKEN_SECRET}`,
    (err, decoded: any) => {
      if (err) return res.status(403).json({ message: 'Forbidden' })
      req.name = decoded.userInfo.name
      req.email = decoded.userInfo.email
      req.userId = decoded.userInfo.userId
      next()
    }
  )
};

export default verifyJWT;
