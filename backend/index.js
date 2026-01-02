const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');
dotenv.config();

const userRoutes = require("./routes/user");
const todoRoutes = require("./routes/todo");

const port = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());

app.get("/healthy", (req, res) => {
  res.send("I am healthy");
});

app.use("/user", userRoutes);
app.use("/todo", todoRoutes);

app.listen(port, () => {
  console.log(`Server is listening at https://localhost:${port}`);
});
