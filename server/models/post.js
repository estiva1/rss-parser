const mongoose = require("mongoose");

const rssSchema = new mongoose.Schema({
  creator: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

// Virtual for rss's URL
rssSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/rss/${this._id}`;
});

module.exports = mongoose.model("Post", rssSchema);
