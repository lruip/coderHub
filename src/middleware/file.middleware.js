const multer = require("@koa/multer");
const { UPLOAD_PATH } = require("../config/path");

const uploadMulter = multer({
  dest: UPLOAD_PATH,
});

const handleAvatar = uploadMulter.single("avatar");

module.exports = {
  handleAvatar,
};
