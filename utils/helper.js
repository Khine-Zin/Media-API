const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const fMsg = async (res, msg = "Success", result = []) => {
  res.status(200).json({
    con: true,
    msg,
    result,
  });
};

const encode = passward => bcrypt.hashSync(passward);

const comparePass = (plain, hash) => bcrypt.compareSync(plain, hash);

const makeToken = payload =>
  jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "12h" });

module.exports = {
  fMsg,
  encode,
  comparePass,
  makeToken,
};
