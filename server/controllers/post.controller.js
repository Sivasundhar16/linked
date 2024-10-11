import cloudinary from "../cloud/cloudnary.js";
import Post from "../models/post.model.js";

export const getFeedPost = async (req, res) => {
  try {
    const posts = await Post.find({ author: { $in: req.user.connections } })
      .populate("author", "name username profilePicture headline")
      .populate("comments.user", "name profilePicture")
      .sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.log("Error in Getfeedpost controller", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const createPost = async (req, res) => {
  try {
    const { content, image } = req.body;
    let newPost;
    if (image) {
      const imageResult = await cloudinary.uploader.upload(image);
      newPost = new Post({
        author: req.user._id,
        content,
        image: imageResult.secure_url,
      });
    } else {
      newPost = new Post({
        author: req.user._id,
        content,
      });
    }
    await newPost.save();
    res.status(201).json({ newPost });
  } catch (error) {
    console.log("Error in createpost controller", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post Not found" });
    }
    if (post.author.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not allowed to delete this post" });
    }

    //delete the image from cloudnary
    if (post.image) {
      await cloudinary.uploader.destroy(
        post.image.split("/").pop().split(".")[0]
      );
    }

    await Post.findByIdAndDelete(postId);
    res.status(200).json({ message: "Post Deleted" });
  } catch (error) {
    console.log("Error in Deleting", error.message);
    res.status(400).json({ message: "Error in Deleting" });
  }
};

export const getPostById = async (req, res) => {
  try {
    const postId = req.param.id;
    const post = await Post.findById(postId)
      .populate("author", "name username profilePicture headline")
      .populate("comments.user", "name profilePicture username headline");
    res.status(200).json(post);
  } catch (error) {
    console.log("Error in getPostbyID ", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
