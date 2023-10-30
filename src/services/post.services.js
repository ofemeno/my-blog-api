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
    if (!post) {
      throw Error("Not Found");
    }
    return post;
  } catch (error) {
    throw Error(error.message);
  }
}

export async function updatePostBySlug(req) {
  const slug = req.params.id;
  let newPathname = null;
  let newSlug = null;
  try {
    if (req.file) {
      // get original and path from request
      const { originalname, path } = req.file;

      // get title, summary, content from request.body
      const { title, summary, content } = req.body;

      //   get file extention
      const extention = originalname.split(".")[1];

      newPathname = `${path}.${extention}`;

      //   add extention to file path
      fs.renameSync(path, newPathname);
    }

    const decondedCookie = jwtTokenVerify(req.cookies.token);

    // find post by slug

    const post = await Post.findOne({ slug }).populate("author", "-password");

    if (!post) {
      throw Error("Not Found");
    }

    // check if tile changed
    const didTitleChange = post.title != req.body.title;

    if (didTitleChange) {
      // create slug from title
      newSlug = postUrlmaker(req.body.title);
    }

    // check if user id from cookies matches owner of post
    const isAuthor =
      JSON.stringify(decondedCookie.id) === JSON.stringify(post.author._id);
    if (!isAuthor) {
      throw Error("You are not the author");
    }

    const newPost = await Post.findOneAndUpdate(
      { slug },
      {
        slug: newSlug ? newSlug : slug,
        title: req.body.title,
        content: req.body.content,
        cover: newPathname ? newPathname : post.cover,
      },
      { new: true }
    );
    return newPost;
  } catch (error) {
    throw Error(error.message);
  }
}
