const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
    thoughtText: { type: String, required: true, characterLength: 1-280 },
    createdAt: { type: Date, default: Date.now, needTo: "Use a getter method to format the timestamp on query"},
    username: { type: String, required: true},
    reactions: { needTo: "Array of nested documents created with the reactionSchema - Schema Settings - Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query."},
  });

const Thought = mongoose.model('Thought', thoughtSchema);

const handleError = (err) => console.error(err);

Thought.find({}).exec((err, collection) => {
    if (collection.length === 0) {
        Thought.insertMany(
        [
          { name: 'Thought1' },
          { name: 'Thought2' },
        ],
        (insertErr) => {
          if (insertErr) {
            handleError(insertErr);
          }
        }
      );
    }
  });
  
  module.exports = Thought;