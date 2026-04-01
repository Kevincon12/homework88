import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";

import usersRouter from "./routes/users";
import postsRouter from "./routes/posts";
import commentsRouter from "./routes/comments";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "../public/images")));

app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);

mongoose.connect("mongodb://127.0.0.1:27017/forum");

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});