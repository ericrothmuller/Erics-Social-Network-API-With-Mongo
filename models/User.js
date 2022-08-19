const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true, trimmed: true },
  email: { type: String, unique: true, required: true, match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, "You must enter a valid email address"]},
  thoughts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Thought"}],
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User"}],},
{
  toJSON: {
    virtuals: true,
  },
}
);

const User = mongoose.model("User", userSchema);

module.exports = User;