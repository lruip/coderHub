const { create } = require("../service/label.service");
class LabelController {
  create(ctx, next) {
    const { name } = ctx.request.body;
    const result = create(name);

    ctx.body = {
      code: 200,
      message: "创建成功",
    };
  }
}

module.exports = new LabelController();
