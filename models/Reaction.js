const mongoose = require('mongoose');
const moment = require("moment");

const reactionSchema = new mongoose.Schema({
    reactionId: {type: mongoose.Schema.Types.ObjectId, default: new mongoose.Schema.Types.ObjectId},
    reactionBody: {type: String, required: true, max: 280},
    username: {type: String, required: true},
    createdAt: {type: Date, default: Date.now(), get: moment().format("MMM Do YY")},},
    {
      toJSON: {
        getters: true,
      },
    }
  );

module.exports = reactionSchema;