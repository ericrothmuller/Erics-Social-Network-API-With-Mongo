const mongoose = require('mongoose');
const Thought = require('./Thought');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true, trimmed: true },
  email: { type: String, unique: true, required: true, match: "validator goes here"},
  thoughts: { type: mongoose.Schema.Types.ObjectId, ref: Thought},
  friends: [{ type: Schema.Types.ObjectId, ref: User}],
});

const User = mongoose.model('User', userSchema);
  
module.exports = User;