const mongoose = require('mongoose');
const moment = require("moment");
const reactionSchema = require("./Reaction");

const thoughtSchema = new mongoose.Schema({
    thoughtText: { type: String, required: true, min: 1, max: 280 },
    createdAt: { type: Date, default: Date.now,},
    username: { type: String, required: true},
    reactions: [reactionSchema],},
  {
    toJSON: { 
      virtuals: true,
    },
  }
);

const Thought = mongoose.model('Thought', thoughtSchema);


  module.exports = Thought;