const DB = require("../dbs/post");
const Helper = require("../utils/helper");

const all = async (req, res, next) => {
  let posts = await DB.find().populate("user category", "-passward -__v");
  Helper.fMsg(res, "All category", posts);
};

const get = async (req, res, next) => {
  let post = await DB.findById(req.params.id).populate(
    "user category",
    "-passward -__v"
  );
  if (post) {
    Helper.fMsg(res, "Single Post", post);
  } else {
    next(new Error("No post with that id"));
  }
};

const post = async (req, res, next) => {
  let userId = req.body.user._id;
  delete req.body.user;
  req.body.user = userId;
  let result = await new DB(req.body).save();
  Helper.fMsg(res, "Post Added", result);
};

const patch = async (req, res, next) => {
  let post = await DB.findById(req.params.id);
  if (post) {
    await DB.findByIdAndUpdate(post._id, req.body);
    let result = await DB.findById(req.params.id);
    Helper.fMsg(res, "Post Updated", result);
  } else {
    next(new Error("No Post with that id"));
  }
};

const drop = async (req, res, next) => {
  let post = await DB.findById(req.params.id);
  if (post) {
    await DB.findByIdAndDelete(post._id);
    Helper.fMsg(res, "Post Deleted");
  } else {
    next(new Error("No Post with that id"));
  }
};

const byCatId = async (req, res, next) => {
  let post = await DB.find({ category: req.params.id });
  Helper.fMsg(res, "All post by Category", post);
};

const paginate = async (req, res, next) => {
  let page = req.params.page;
  page = page == 1 ? 0 : page - 1;
  let limit = Number(process.env.POST_LIMIT);
  let skipCount = limit * page;

  let posts = await DB.find()
    .skip(skipCount)
    .limit(limit);
  Helper.fMsg(res, "Paginate Posts", posts);
};

module.exports = {
  all,
  post,
  get,
  patch,
  drop,
  byCatId,
  paginate,
};
