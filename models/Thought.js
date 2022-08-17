const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
    thoughtText: { type: String, required: true, min: 1, max: 280 },
    createdAt: { type: Date, default: Date.now, needTo: "Use a getter method to format the timestamp on query"},
    username: { type: String, required: true},
    reactions: [reactionSchema],},
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

const Thought = mongoose.model('Thought', thoughtSchema);


  module.exports = Thought;