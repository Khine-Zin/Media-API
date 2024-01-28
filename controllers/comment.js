const DB = require("../dbs/comment");
const Helper = require("../utils/helper");

const all = async (req, res, next) => {
  let comment = await DB.find();
  Helper.fMsg(res, "All Comment", comment);
};

const add = async (req, res, next) => {
  let saveComment = new DB(req.body);
  let result = await saveComment.save();
  Helper.fMsg(res, "Add New Comment", result);
};

const drop = async (req, res, next) => {
  let dbComment = await DB.findById(req.params.id);

  if (dbComment) {
    await DB.findByIdAndDelete(dbComment._id);
  } else {
    next(new Error("No Comment with that id"));
  }
};

module.exports = {
  all,
  add,
  drop,
};
