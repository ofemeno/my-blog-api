import fs from "node:fs";
import Post from "../models/Post.js";

// function to create new post
export async function createPost(req) {
  try {
    // get original and path from request
    const { originalname, path } = req.file;

    // get title, summary, content from request.body
    const { title, summary, content } = req.body;
    console.log(req.body);

    //   get file extention
    const extention = originalname.split(".")[1];

    const newPathname = `${path}.${extention}`;
    //   add extention to file path
    fs.renameSync(path, newPathname);

    const post = new Post({
      title,
      summary,
      content,
      cover: newPathname,
    });

    const newPost = await post.save();
    return newPost;
  } catch (error) {
    throw Error(error.message);
  }
}

// fetch all post from database
export async function getAllPost(payload) {
  try {
    const post = await Post.find();
    return post;
  } catch (error) {
    throw Error(error.message);
  }
}
