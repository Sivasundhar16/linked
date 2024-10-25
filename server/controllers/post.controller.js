import cloudinary from "../cloud/cloudnary.js";
import Post from "../models/post.model.js";
import Notification from "../models/notification.model.js";
import { sendCommentNotificationEmail } from "../email/emailHandlers.js";

// param
export const getFeedPosts = async (req, res) => {
  try {
    // Fallback if connections is undefined or null
    const connections = Array.isArray(req.user.connections)
      ? req.user.connections
      : [];

    const posts = await Post.find({
      author: { $in: [...connections, req.user._id] },
    })
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
    // if (post.image) {
    //   await cloudinary.uploader.destroy(
    //     post.image.split("/").pop().split(".")[0]
    //   );
    // }
    // delete the image from cloudinary as well!
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
    const postId = req.params.id;
    const post = await Post.findById(postId)
      .populate("author", "name username profilePicture headline")
      .populate("comments.user", "name profilePicture username headline");
    res.status(200).json(post);
  } catch (error) {
    console.log("Error in getPostbyID ", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const createComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const { content } = req.body;

    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { comments: { user: req.user._id, content } },
      },
      { new: true }
    ).populate("author", "name email username headline profilePicture");

    // create the notification if comment made by others

    if (post.author.toString() !== req.user._id.toString()) {
      const newNotification = new Notification({
        recipient: post.author,
        type: "comments",
        relatedUser: req.user._id,
        relatedPost: postId,
      });
      await newNotification.save();

      //send email

      try {
        const postUrl = process.env.CLIENT_URL + "/post/" + postId;
        await sendCommentNotificationEmail(
          post.author.email,
          post.author.name,
          req.user.name,
          postUrl,
          content
        );
      } catch (error) {
        console.log("Error in message Sending", error);
      }
    }
    res.status(200).json(post);
  } catch (error) {
    console.log("Error in requrest", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    const userId = req.user._id;

    if (post.likes.includes(userId)) {
      //unlike the post
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
    } else {
      // like the post

      if (post.author.toString() !== userId.toString()) {
        const newNotification = new Notification({
          recipient: post.author,
          type: "like",
          relatedUser: userId,
          relatedPost: postId,
        });
        await newNotification.save();
      }
      await post.save();
      res.status(200).json(post);
    }
  } catch (error) {
    console.log("Error ", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
