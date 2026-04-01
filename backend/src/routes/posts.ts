import express from "express";
import Post from "../models/Post";
import auth from "../middleware/auth";
import multer from "multer";
import path from "path";
import { Request } from "express";

const router = express.Router();

const storage = multer.diskStorage({
    destination: "public/images",
    filename: (_req: Request, file: Express.Multer.File, cb: any) => {
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    },
});

const upload = multer({ storage });

router.post("/", auth, upload.single("image"), async (req: any, res) => {
    const { title, description } = req.body;

    if (!title) {
        return res.status(400).send({ error: "Title required" });
    }

    if (!description && !req.file) {
        return res.status(400).send({ error: "Fill description or image" });
    }

    const post = new Post({
        title,
        description,
        image: req.file ? "images/" + req.file.filename : null,
        user: req.user._id,
    });

    await post.save();

    res.send(post);
});

router.get("/", async (_req, res) => {
    const posts = await Post.find()
        .sort({ createdAt: -1 })
        .populate("user", "username");

    res.send(posts);
});

router.get("/:id", async (req, res) => {
    const post = await Post.findById(req.params.id)
        .populate("user", "username");

    res.send(post);
});

export default router;