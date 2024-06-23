const momentService = require("../service/moment.service");

class MomentController {
  async create(ctx, next) {
    const { content } = ctx.request.body;
    // 获取动态由谁发布,(根据用户id)
    const { id } = ctx.user;
    const result = await momentService.create(content, id);

    ctx.body = {
      code: 200,
      message: "发表成功～",
      result,
    };
  }

  async list(ctx, next) {
    const { size = 10, offset = 0 } = ctx.request.body;
    const result = await momentService.queryList(size, offset);
    ctx.body = {
      code: 200,
      message: "获取成功",
      result,
    };
  }

  async detail(ctx, next) {
    const { momentId } = ctx.params;
    const result = await momentService.queryById(momentId);
    ctx.body = {
      code: 200,
      message: "获取成功",
      result: result[0],
    };
  }

  async remove(ctx, next) {
    const { momentId } = ctx.params;
    console.log(momentId);
    const result = await momentService.remove(momentId);
    ctx.body = {
      code: 200,
      message: "删除成功～",
      data: result,
    };
  }

  async update(ctx, next) {
    const { momentId } = ctx.params;
    const { content } = ctx.request.body;

    const result = await momentService.update(content, momentId);
    ctx.body = {
      code: 200,
      message: "更新成功～",
      data: result,
    };
  }

  async addLabels(ctx, next) {
    const { labels } = ctx;
    const { momentId } = ctx.params;

    try {
      for (let label of labels) {
        // 查询label是否存在
        const result = await momentService.hasLabel(momentId, label.id);
        if (!result) {
          const result = await momentService.addLabel(momentId, label.id);
        }
      }
      ctx.body = {
        code: 200,
        message: "添加成功",
      };
    } catch (err) {
      ctx.body = {
        code: -10002,
        message: err,
      };
    }
  }
}

module.exports = new MomentController();
