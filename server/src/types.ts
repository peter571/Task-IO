import { Request } from "express";

export interface RequestWithUserInfo extends Request {
    name?: string;
    email?: string;
    userId?: string;
}
