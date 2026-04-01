import mongoose from "mongoose";
import { randomUUID } from "node:crypto";
import User from "./models/User";
import Post from "./models/Post";
import CommentModel from "./models/Comment";

const run = async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/forum");

    const db = mongoose.connection;

    try {
        await db.dropCollection("users");
        await db.dropCollection("posts");
        await db.dropCollection("comments");
    } catch {}

    const [user1, user2] = await User.create(
        {
            username: "user1",
            password: "123",
            token: randomUUID(),
        },
        {
            username: "user2",
            password: "123",
            token: randomUUID(),
        }
    );

    const [post1, post2] = await Post.create(
        {
            title: "First post",
            description: "Hello world",
            user: user1._id,
        },
        {
            title: "Second post",
            image: "images/test.jpg",
            user: user2._id,
        }
    );

    await CommentModel.create(
        {
            text: "Nice",
            user: user1._id,
            post: post1._id,
        },
        {
            text: "Cool",
            user: user2._id,
            post: post1._id,
        },
        {
            text: "Wow",
            user: user1._id,
            post: post2._id,
        },
        {
            text: "Super",
            user: user2._id,
            post: post2._id,
        }
    );

    await db.close();
};

run().catch(console.error);