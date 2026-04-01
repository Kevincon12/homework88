import mongoose, { Types } from "mongoose";

const CommentSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
        },
        user: {
            type: Types.ObjectId,
            ref: "User",
            required: true,
        },
        post: {
            type: Types.ObjectId,
            ref: "Post",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const CommentModel = mongoose.model("Comment", CommentSchema);
export default CommentModel;