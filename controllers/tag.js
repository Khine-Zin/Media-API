const DB = require("../dbs/tag");
const Helper = require("../utils/helper");

const all = async (req, res, next) => {
  let tags = await DB.find();
  Helper.fMsg(res, "All Tags", tags);
};

const get = async (req, res, next) => {
  let tag = await DB.findById(req.params.id);
  if (tag) {
    Helper.fMsg(res, "Single Tag", tag);
  } else {
    next(new Error("No tag with that id"));
  }
};

const add = async (req, res, next) => {
  let dbTag = await DB.findOne({ name: req.body.name });
  if (dbTag) {
    next(new Error("Tag is Already Exist"));
    return;
  }
  let saveTag = new DB(req.body);
  let result = await saveTag.save();
  Helper.fMsg(res, "Add New Tag", result);
};

const patch = async (req, res, next) => {
  let tag = await DB.findById(req.params.id);
  if (tag) {
    await DB.findByIdAndUpdate(tag._id, req.body);
    let result = await DB.findById(req.params.id);
    Helper.fMsg(res, "Tag Updated", result);
  } else {
    next(new Error("No Tag with that id"));
  }
};

const drop = async (req, res, next) => {
  let tag = await DB.findById(req.params.id);
  if (tag) {
    await DB.findByIdAndDelete(tag._id);
    Helper.fMsg(res, "Tag Deleted");
  } else {
    next(new Error("No Tag with that id"));
  }
};

module.exports = {
  all,
  add,
  get,
  patch,
  drop,
};
