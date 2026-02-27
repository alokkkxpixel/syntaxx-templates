import { asyncHandler } from "../utils/asyncHandler.js";

export const healthCheck = (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
};

// 1️⃣ used for error handling using error.middleware.js

// export const getUser = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.params.id);

//     if (!user) {
//       return next({
//         status: 404,
//         message: "User not found"
//       });
//     }

//     res.status(200).json(user);
//   } catch (err) {
//     next(err); // 👈 VERY IMPORTANT
//   }
// };

// 2️⃣ used for error handling using asyncHandler.js NO NEED TO WRITE TRY-CATCH

// export const createPost = asyncHandler(async (req, res) => {
//   const { title } = req.body;

//   if (!title) {
//     // you can throw error with status code and message customly
//     throw { status: 300, message: "can't create post without title" };
//   }

//   const post = {
//     title,
//     createdAt: new Date().toISOString(),
//   };

//   res.status(201).json({
//     message: "Post created successfully",
//     post,
//   });
// });
