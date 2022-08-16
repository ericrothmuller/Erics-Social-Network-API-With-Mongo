const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true, trimmed: true },
  email: { type: String, unique: true, required: true, validator: true},
  thoughts: { needTo: "array of _id values referencing the Thought model"},
  friends: { needTo: "array of _id values referencing the User model (self-reference) - Schema Settings - Create a virtual called friendCount that retrieves the length of the user's friends array field on query."},
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