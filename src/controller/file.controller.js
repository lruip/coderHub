const fs = require("fs");
const fileService = require("../service/file.service");
const { UPLOAD_PATH } = require("../config/path");
const { SERVER_PORT, SERVER_HOST } = require("../config/server");
const userService = require("../service/user.service");
class FileController {
  async create(ctx, next) {
    const { filename, mimetype, size } = ctx.request.file;
    const { id } = ctx.user;
    const resule = await fileService.create(filename, mimetype, size, id);

    // 把头像存储到user表中
    const avatarUrl = `${SERVER_HOST}:${SERVER_PORT}/upload/avatar/${id}`;
    const resule1 = await userService.updateUserAvatar(avatarUrl, id);

    ctx.body = {
      code: 200,
      message: "上传成功",
      data: resule,
    };
  }

  async showAvatar(ctx, next) {
    const { userId } = ctx.params;
    const avatarInfo = await fileService.queryAvatar(userId);

    // 创建可读流
    const { filename, mimetype } = avatarInfo;
    ctx.type = mimetype;
    ctx.body = fs.createReadStream(`${UPLOAD_PATH}/${filename}`);
  }
}

module.exports = new FileController();
