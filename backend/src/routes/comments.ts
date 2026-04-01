import express from "express";
import CommentModel from "../models/Comment";
import auth from "../middleware/auth";

const router = express.Router();

router.post("/", auth, async (req: any, res) => {
    const { text, postId } = req.body;

    const comment = new CommentModel({
        text,
        post: postId,
        user: req.user._id,
    });

    await comment.save();

    res.send(comment);
});

router.get("/:postId", async (req, res) => {
    const comments = await CommentModel.find({ post: req.params.postId })
        .populate("user", "username");

    res.send(comments);
});

export default router;