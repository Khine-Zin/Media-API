const DB = require("../dbs/category");
const Helper = require("../utils/helper");

const all = async (req, res, next) => {
  let cats = await DB.find();
  Helper.fMsg(res, "All category", cats);
};

const add = async (req, res, next) => {
  let dbCat = await DB.findOne({ name: req.body.name });
  if (dbCat) {
    next(new Error("Category is Already Exist"));
    return;
  }
  let saveUser = new DB(req.body);
  let result = await saveUser.save();
  Helper.fMsg(res, "Add New Category", result);
};

const get = async (req, res, next) => {
  let cat = await DB.findById(req.params.id);
  Helper.fMsg(res, "Single Category", cat);
};

const patch = async (req, res, next) => {
  let dbCat = await DB.findById(req.params.id);
  if (dbCat) {
    await DB.findByIdAndUpdate(dbCat._id, req.body);
    let result = await DB.findById(req.params.id);
    Helper.fMsg(res, "Category Updated", result);
  } else {
    next(new Error("No Category with that id"));
  }
};

const drop = async (req, res, next) => {
  let dbCat = await DB.findById(req.params.id);

  if (dbCat) {
    await DB.findByIdAndDelete(dbCat._id);
  } else {
    next(new Error("No Category with that id"));
  }
};

module.exports = {
  all,
  add,
  get,
  patch,
  drop,
};
