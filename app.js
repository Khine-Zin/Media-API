require("dotenv").config();

const path = require("path");
const express = require("express");

const fileUpload = require("express-fileupload");
const app = express();

app.use(fileUpload());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const mongoose = require("mongoose");

mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);

const userRoute = require("./routes/user");
const categoryRoute = require("./routes/category");
const postRoute = require("./routes/post");
const TagRoute = require("./routes/tag");
const CommentRoute = require("./routes/comment");

app.use("/users", userRoute);
app.use("/categories", categoryRoute);
app.use("/posts", postRoute);
app.use("/tags", TagRoute);
app.use("/comments", CommentRoute);

app.use((err, req, res, next) => {
  err.status = err.status || 200;
  res.status(err.status).json({
    con: false,
    msg: err.message,
  });
});

app.listen(process.env.PORT, console.log("Server is running at port 3000"));
