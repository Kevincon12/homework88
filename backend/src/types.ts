import { Request } from "express";
import { HydratedDocument } from "mongoose";
import User from "./models/User";

export interface RequestWithUser extends Request {
    user?: HydratedDocument<typeof User>;
}