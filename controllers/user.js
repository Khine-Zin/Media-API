const DB = require("../dbs/user");
const Helper = require("../utils/helper");

const all = async (req, res, next) => {
  let user = await DB.find();
  Helper.fMsg(res, "All User", user);
};

const login = async (req, res, next) => {
  let phoneUser = await DB.findOne({ phone: req.body.phone }).select("-__v");
  if (phoneUser) {
    const result = Helper.comparePass(req.body.passward, phoneUser.passward);
    if (result) {
      let user = phoneUser.toObject();
      user.token = Helper.makeToken(user);
      Helper.fMsg(res, "Login Success", user);
    } else {
      next(new Error("Credital Error"));
    }
  }
};

const register = async (req, res, next) => {
  let nameUser = await DB.findOne({ name: req.body.name });
  if (nameUser) {
    next(new Error("Name is already in use"));
    return;
  }
  let emailUser = await DB.findOne({ email: req.body.email });
  if (emailUser) {
    next(new Error("Email is already in use"));
    return;
  }
  let phoneUser = await DB.findOne({ passward: req.body.phone });
  if (phoneUser) {
    next(new Error("Phone is already in use"));
    return;
  }

  req.body.passward = Helper.encode(req.body.passward);

  let saveUser = new DB(req.body);
  let result = await saveUser.save();
  Helper.fMsg(res, "Add New User", result);
};

module.exports = {
  all,
  login,
  register,
};
