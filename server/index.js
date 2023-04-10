#! /usr/bin/env node
// command to run in terminal
// node index.js "mongodb+srv://solarcoasterst:d3dx12.dll@cluster0.eiej6fc.mongodb.net/local_library?retryWrites=true&w=majority"

const axios = require("axios");
const Parser = require("rss-parser");
const Post = require("./models/post");

const parser = new Parser();

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const posts = [];
const rssUrl = "https://lifehacker.com/rss";

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = userArgs[0];
main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createPosts();
  console.log("Debug: Closing mongoose");
  await mongoose.connection.close();
}

async function createPosts() {
  const response = await axios.get(rssUrl);
  const feed = await parser.parseString(response.data);

  for (const item of feed.items) {
    const existingPost = await Post.findOne({
      title: item.title,
      creator: item.creator,
      link: item.link,
    });

    if (existingPost) {
      console.log(
        `Post ${item.title} by ${item.creator} already exists, skipping`
      );
      continue;
    }

    const post = new Post({
      creator: item.creator,
      title: item.title,
      link: item.link,
    });

    try {
      await post.save();
      posts.push(post);
      console.log(`Saved post ${post.title} by ${post.creator}`);
    } catch (err) {
      console.error(
        `Could not save post ${post.title} by ${post.creator}`,
        err
      );
    }
  }
}
