const { Router } = require("express");
const userMiddleware = require("../middleware/user");
const router = Router();
const { Todo } = require("../database/index");

// todo Routes
router.post("/", userMiddleware, async (req, res) => {
  const { title, description } = req.body;
  try {
    await Todo.create({
      title: title,
      description: description,
      user: req.user.id,
    });
    return res.json({
      msg: `Todo created successfully`,
    });
  } catch (e) {
    return res.status(500).json({
      msg: `Failed to create Todo`,
    });
  }
});

router.put("/:id", userMiddleware, async (req, res) => {
  const todoId = req.params.id;
  const { title, description, completed } = req.body;
  try {
    const todo = await Todo.findOne({
      _id: todoId,
      user: req.user.id,
    });
    if (!todo) {
      return res.status(404).json({
        msg: `Todo is invalid or does not exist`,
      });
    }
    if (title !== undefined) todo.title = title;
    if (description !== undefined) todo.description = description;
    if (completed !== undefined) todo.completed = completed;
    await todo.save();
    res.json({
      msg: `Todo updated successfully`,
    });
  } catch (e) {
    return res.status(500).json({
      msg: `Error updating todo`,
    });
  }
});

router.delete("/", userMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await Todo.deleteMany({
      user: userId,
    });

    return res.json({
      msg: "Todos deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (e) {
    return res.status(500).json({
      msg: "Error deleting todos",
    });
  }
});

router.delete("/:id", userMiddleware, async (req, res) => {
  try {
    const todoId = req.params.id;
    const userId = req.user.id;

    await Todo.findOneAndDelete({
      _id: todoId,
      user: userId,
    });

    return res.json({
      msg: "Todos deleted successfully",
    });
  } catch (e) {
    return res.status(500).json({
      msg: "Error deleting todo",
    });
  }
});

router.get("/", userMiddleware, async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id });
    res.json(todos);
  } catch (e) {
    return res.status(500).json({
      msg: `Error fetching todos`
    })
  }
});

router.get("/:id", userMiddleware, async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!todo) {
      return res.status(404).json({ msg: "Todo not found" });
    }

    res.json(todo);
  } catch (e) {
    return res.status(500).json({
      msg: `Error fetching todo`,
    });
  }
});

module.exports = router;
