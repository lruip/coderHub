const commentService = require("../service/comment.service");
class CommentController {
  async publish(ctx, next) {
    const { id } = ctx.user;
    const { momentId, content } = ctx.request.body;
    const result = await commentService.create(id, momentId, content);
    ctx.body = {
      code: 200,
      message: "发表成功",
      data: result,
    };
  }

  async reply(ctx, next) {
    const { id } = ctx.user;
    const { momentId, commentId, content } = ctx.request.body;
    const result = await commentService.reply(id, momentId, commentId, content);
    ctx.body = {
      code: 200,
      message: "回复成功",
      data: result,
    };
  }
}

module.exports = new CommentController();
