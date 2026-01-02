const { Router } = require("express");
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const router = Router();
const { UserModel, Todo } = require("../database/index");
const userMiddleware = require("../middleware/user");

router.post("/signup", async (req, res) => {
  const RequiredBody = z.object({
    email: z.string().min(3).max(100).email(),
    password: z.string().min(6),
  });
  const parsedWithSuccess = RequiredBody.safeParse(req.body);
  if (!parsedWithSuccess.success) {
    return res.status(404).json({
      error: parsedWithSuccess.error,
    });
  }
  const email = req.body.email;
  const password = req.body.password;
  const hashed_password = await bcrypt.hash(password, 5);
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ msg: "User already exists" });
  }
  await UserModel.create({
    email: email,
    password: hashed_password,
  });
  res.json({
    msg: `You have signed up successfully`,
  });
});

router.post("/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        msg: `Invalid password!!`,
      });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email },
      `${process.env.JWT_SECRET}`
    );
    res.json({
      msg: `Logged In Successfully`,
      token,
    });
  } catch (e) {
    return res.status(400).json({ msg: `Error in logging in` });
  }
});

router.get("/todos", userMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await Todo.find({
      user: userId,
    });
    return res.json({
      msg: `Fetched todos successfully`,
      todos: result,
    });
  } catch (e) {
    return res.status(500).json({
      msg: `Error fetching todos`,
    });
  }
});

router.post("/logout", userMiddleware, (req, res) => {
  res.json({
    msg: `Logged out successfully`,
  });
});

module.exports = router;
