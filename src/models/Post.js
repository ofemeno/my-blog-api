import { Schema, model } from "mongoose";

const postShema = new Schema(
  {
    title: { type: String, required: true },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    cover: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Post = model("Post", postShema);

export default Post;
