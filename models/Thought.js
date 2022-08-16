const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastAccessed: { type: Date, default: Date.now },
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