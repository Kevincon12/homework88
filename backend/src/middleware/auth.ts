import { Response, NextFunction } from "express";
import { HydratedDocument } from "mongoose";
import User from "../models/User";
import { RequestWithUser } from "../types";

const auth = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const token = req.get("Authorization");

        if (!token) {
            return res.status(401).send({ error: "No token" });
        }

        const user: HydratedDocument<typeof User> | null = await User.findOne({ token });

        if (!user) {
            return res.status(401).send({ error: "Invalid token" });
        }

        req.user = user;
        next();
    } catch (e) {
        res.status(500).send({ error: "Server error" });
    }
};

export default auth;