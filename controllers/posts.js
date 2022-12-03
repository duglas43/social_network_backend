import Post from "../models/Post.js";
import User from "../models/User.js";

export const createPosts = async (req, res) => {
  try {
    const userId = req.user.id;
    const { description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      picturePath,
      userPicturePath: user.picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();
    const post = await Post.find().sort("-createdAt");
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Не удалось создать пост" });
  }
};

export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find().sort("-createdAt");
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Не удалось получить посты" });
  }
};
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Не удалось получить посты" });
  }
};
export const likePosts = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    console.log(userId, id);
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: "Не удалось поставить лайк" });
  }
};
