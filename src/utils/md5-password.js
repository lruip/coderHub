const crypto = require("crypto");

function md5Password(password) {
  const md5 = crypto.createHash("md5");

  // 同过md5加密并且转化为16进制
  const madPwd = md5.update(password).digest("hex");

  return madPwd;
}

module.exports = md5Password;
