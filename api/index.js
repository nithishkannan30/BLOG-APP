const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Post = require("./models/Post");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const fs = require("fs");
const uploadMiddleware = multer({ dest: "uploads/" });

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
console.log(__dirname);

mongoose.connect(
  "mongodb+srv://admin:eSGZIcnpPn51QM25@cluster0.kupt8ae.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const salt = bcrypt.genSaltSync(10);
const secret = "jkgwqrkosdaLKLP2320034JK";

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    console.error("Error during registration:", e);
    res.status(400).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.findOne({ username });
    if (!userDoc) {
      return res.status(400).json("User not found");
    }
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
        if (err) {
          console.error("Error generating token:", err);
          return res.status(500).json("Error generating token");
        }
        res.cookie("token", token, { httpOnly: true }).json({
          id: userDoc._id,
          username,
        });
        console.log("Token set:", token);
      });
    } else {
      res.status(400).json("Wrong credentials");
    }
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json("Internal server error");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    console.warn("Token not provided");
    return res.status(401).json("Token not provided");
  }
  jwt.verify(token, secret, (err, info) => {
    if (err) {
      console.error("Invalid token:", err);
      return res.status(403).json("Invalid token");
    }
    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "", { httpOnly: true }).json("ok");
});

app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);
  const relativePath = newPath
    .replace("uploads\\", "uploads/")
    .replace(/\\/g, "/");
  const { title, summary, content } = req.body;
  const { token } = req.cookies;
  jwt.verify(token, secret, async (err, info) => {
    if (err) {
      console.error("Invalid token:", err);
      return res.status(403).json("Invalid token");
    }
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: relativePath,
      author: info.id,
    });
    res.json(postDoc);
  });
});

app.get("/post", async (req, res) => {
  res.json(
    await Post.find().populate("author", ["username"]).sort({ createdAt: -1 })
  );
});
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json("Internal server error");
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate("author", ["username"]);
  res.json(postDoc);
});

app.put("/post", uploadMiddleware.single("file"), async (req, res) => {
  let relativePath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    relativePath = newPath.replace("uploads\\", "uploads/").replace(/\\/g, "/");
  }
  const { token } = req.cookies;
  const { title, summary, content, id } = req.body;
  
  jwt.verify(token, secret, async (err, info) => {
      if (err) {
        console.error("Invalid token:", err);
        return res.status(403).json("Invalid token");
      }
      const postDoc = await Post.findById(id);
      const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
   
      if (!isAuthor) {
        return res.status(200).json("you are not the author");
      }
      await postDoc.updateOne({
        title,
        summary,
        content,
        cover: relativePath ? relativePath : postDoc.cover,
      });
      res.json(postDoc);
  });
});

app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});
