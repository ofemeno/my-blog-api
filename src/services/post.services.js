import fs from "node:fs";
import Post from "../models/Post.js";
import User from "../models/User.js";
import { jwtTokenVerify } from "../utils/tokenGenerator.js";
import { postUrlmaker } from "../utils/postUrlMaker.js";

// function to create new post
export async function createPost(req) {
  try {
    // get original and path from request
    const { originalname, path } = req.file;

    // get title, summary, content from request.body
    const { title, summary, content } = req.body;

    // create slug from title
    const slug = postUrlmaker(title);

    // decode token cookie
    const decondedCookie = jwtTokenVerify(req.cookies.token);

    //   get file extention
    const extention = originalname.split(".")[1];

    const newPathname = `${path}.${extention}`;

    //   add extention to file path
    fs.renameSync(path, newPathname);

    // create new post
    const post = new Post({
      title,
      summary,
      content,
      cover: newPathname,
      author: decondedCookie.id,
      slug,
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
    const post = await Post.find()
      .populate("author", "-password")
      .sort({ createdAt: -1 })
      .limit(20);
    return post;
  } catch (error) {
    throw Error(error.message);
  }
}

export async function getPostBySlug(slug) {
  try {
    const post = await Post.findOne({ slug }).populate("author", "-password");
    if(!post){
      throw Error("Not Found");
    }
    return post;
  } catch (error) {
    throw Error(error.message);
  }
}
