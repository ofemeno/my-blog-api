import { createPost, getAllPost } from "../services/post.services.js";

export async function post(req, res) {
  try {
    // create new post
    const post = await createPost(req);
    console.log(post);
    res.status(201).json(post);
  } catch (error) {
    console.log(error);
    res.json({ error: error.message });
  }
}

export async function allPost(req, res) {
  try {
    const posts = await getAllPost();
    res.status(200).json(posts);
  } catch (error) {
    res.json({ error: error.message });
  }
}
