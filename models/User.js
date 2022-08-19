const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true, trimmed: true },
  email: { type: String, unique: true, required: true, validator: function(v) {return /^([a-z0-9\+_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,100})$/.test(v)},
  message: props => `${props.value} is not a valid email!`},
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