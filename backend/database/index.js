const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const { required } = require("zod/mini");
const Schema = mongoose.Schema;
const objectId = Schema.Types.ObjectId;

mongoose
  .connect(`${process.env.MONGOURL}`)
  .then(() => console.log("DB connected..."))
  .catch((e) => {
    console.log("Error in connecting DB", e);
  });

const UserSchema = new Schema({
  email: { type: String, unique: true , required: true},
  password: {type: String, required: true},
});

const TodoSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String, default: ""},
  user: {type: objectId, required: true},
  completed: {type:Boolean, default: false}
});

const UserModel = mongoose.model("User", UserSchema);
const Todo = mongoose.model("Todo", TodoSchema);

module.exports = {
  UserModel,
  Todo,
};
