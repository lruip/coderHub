const { CONTENT_NOT_EXISTS } = require("../config/error");

const verifyMoment = async (ctx, next) => {
  const { content } = ctx.request.body;
  if (!content) {
    return ctx.app.emit("error", CONTENT_NOT_EXISTS, ctx);
  }
  await next();
};

module.exports = { verifyMoment };
