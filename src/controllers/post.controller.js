import {
  createPost,
  getAllPost,
  getPostBySlug,
  updatePostBySlug,
} from "../services/post.services.js";

export async function post(req, res) {
  try {
    // create new post
    const post = await createPost(req);
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

export async function getPost(req, res) {
  try {
    const slug = req.params.id;
    console.log(slug);
    const post = await getPostBySlug(slug);
    res.status(200).json(post);
  } catch (error) {
    res.json({ error: error.message });
  }
}

export async function updatePost(req, res) {
  try {
    const updatePost = await updatePostBySlug(req);
  res.json(updatePost)
  } catch (error) {
    console.log(error)
    res.json({ error: error.message });
  }
}
