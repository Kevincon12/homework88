import express from "express";
import User from "../models/User";
import { randomUUID } from "node:crypto";
import bcrypt from "bcrypt";

const usersRouter = express.Router();

usersRouter.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).send({ error: "Username and password required" });

        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).send({ error: "User already exists" });

        const token = randomUUID();
        const user = new User({ username, password, token });
        await user.save();

        const safeUser = {
            _id: user._id,
            username: user.username,
            token: user.token,
        };

        return res.send({ user: safeUser });
    } catch (error) {
        return res.status(500).send({ error: "Server error" });
    }
});

usersRouter.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).send({ error: "Username and password required" });

        const user = await User.findOne({ username });
        if (!user) return res.status(400).send({ error: "Invalid username or password" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send({ error: "Invalid username or password" });

        user.token = randomUUID();
        await user.save();

        const safeUser = {
            _id: user._id,
            username: user.username,
            token: user.token,
        };

        return res.send({ user: safeUser });
    } catch (error) {
        return res.status(500).send({ error: "Server error" });
    }
});

export default usersRouter;