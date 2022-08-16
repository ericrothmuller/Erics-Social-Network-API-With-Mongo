const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastAccessed: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

const handleError = (err) => console.error(err);

User.find({}).exec((err, collection) => {
    if (collection.length === 0) {
        User.insertMany(
        [
          { name: 'User1' },
          { name: 'User2' },
        ],
        (insertErr) => {
          if (insertErr) {
            handleError(insertErr);
          }
        }
      );
    }
  });
  
  module.exports = User;