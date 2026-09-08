import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
import {
  deleteImageFromCloudinary,
  deleteMultipleImagesFromCloudinary,
} from "../lib/cloudinary.js";

export const getPosts = async (req, res) => {
  const query = req.query;

  try {
    const posts = await prisma.post.findMany({
      where: {
        city: query.city || undefined,
        type: query.type || undefined,
        property: query.property || undefined,
        storage: parseInt(query.storage) || undefined,
        price: {
          gte: parseInt(query.minPrice) || undefined,
          lte: parseInt(query.maxPrice) || undefined,
        },
      },
   });

    // setTimeout(() => {
    res.status(200).json(posts);
    // }, 3000);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get posts" });
  }
};

// export const getPost = async (req, res) => {
//   const id = req.params.id;
//   try {
//     const post = await prisma.post.findUnique({
//       where: { id },
//       include: {
//         postDetail: true,
//         user: {
//           select: {
//             username: true,
//             avatar: true,
//           },
//         },
//       },
//     });

//     const token = req.cookies?.token;

//     if (token) {
//       jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
//         if (!err) {
//           const saved = await prisma.savedPost.findUnique({
//             where: {
//               userId_postId: {
//                 postId: id,
//                 userId: payload.id,
//               },
//             },
//           });
//           res.status(200).json({ ...post, isSaved: saved ? true : false });
//         }
//       });
//     }
//     res.status(200).json({...post, isSaved: false });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Failed to get post" });
//   }
// };
// controllers/post.controller.js
export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
      },
    });
    let userId = null;
    const token = req.cookies?.token;
    if (token) {
      try {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        userId = payload.id;
      } catch (err) {
        userId = null;
      }
    }
    let saved = null;
    if (userId) {
      saved = await prisma.savedPost.findUnique({
        where: {
          userId_postId: {
            postId: id,
            userId: userId,
          }
        }
      });
    }

    res.status(200).json({ ...post, isSaved: saved ? true : false });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get post" });
  }
};

export const addPost = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;

  try {
    const newPost = await prisma.post.create({
      data: {
        ...body.postData,
        userId: tokenUserId,
        postDetail: {
          create: body.postDetail,
        }
       
      },
    });
    res.status(200).json(newPost);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create post" });
  }
};

export const updatePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  const body = req.body;

  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: { postDetail: true },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.userId !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }

    // 1. Delete removed images from Cloudinary storage
    if (body.postData?.images && Array.isArray(post.images)) {
      const removedImages = post.images.filter(
        (img) => !body.postData.images.includes(img)
      );
      if (removedImages.length > 0) {
        await deleteMultipleImagesFromCloudinary(removedImages);
      }
    }

    // 2. Update post fields
    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        ...body.postData,
      },
    });

    // 3. Update or upsert postDetail
    if (body.postDetail) {
      await prisma.postDetail.upsert({
        where: { postId: id },
        create: {
          ...body.postDetail,
          postId: id,
        },
        update: {
          ...body.postDetail,
        },
      });
    }

    res.status(200).json(updatedPost);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update post" });
  }
};

export const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.userId !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }

    // 1. Delete all images from Cloudinary storage
    if (post.images && Array.isArray(post.images) && post.images.length > 0) {
      await deleteMultipleImagesFromCloudinary(post.images);
    }

    // 2. Delete related records in database
    await prisma.postDetail.deleteMany({
      where: { postId: id },
    });
    await prisma.savedPost.deleteMany({
      where: { postId: id },
    });

    // 3. Delete the post
    await prisma.post.delete({
      where: { id },
    });

    res.status(200).json({ message: "Post and its images deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete post" });
  }
};

export const deletePostImage = async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ message: "Image URL is required" });
  }

  try {
    const result = await deleteImageFromCloudinary(url);
    res.status(200).json({ message: "Image deleted from storage", result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete image" });
  }
};