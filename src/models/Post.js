import { Schema, model } from "mongoose";

const postShema = new Schema(
  {
    title: { type: String, required: true },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    cover: { type: String, required: true },
    slug: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "user" },
  },
  {
    timestamps: true,
  }
);

const Post = model("Post", postShema);

export default Post;
