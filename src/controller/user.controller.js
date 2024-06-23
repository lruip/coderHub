const userService = require("../service/user.service");
class userController {
  async create(ctx, next) {
    const params = ctx.request.body;

    const result = await userService.create(params);
    ctx.body = {
      message: "创建用户成功~",
      result,
    };
  }
}

module.exports = new userController();
