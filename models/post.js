const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  post: {
    type: String,
    required: true,
  },
  

});

module.exports = mongoose.model("Post", postSchema);


