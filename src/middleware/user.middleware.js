const create = require("../service/user.service");
const md5Password = require("../utils/md5-password");
const {
  NAME_OR_PASSWORD_REQUIRED,
  NAME_IS_ALREADY_EXISTS,
} = require("../config/error");

const verifyUser = async (ctx, next) => {
  const { name, password } = ctx.request.body;

  // 参数校验
  if (!name || !password) {
    return ctx.app.emit("error", NAME_OR_PASSWORD_REQUIRED, ctx);
  }

  // 查询用户是否存在
  const users = await create.queryuser(name);
  if (users.length) {
    return ctx.app.emit("error", NAME_IS_ALREADY_EXISTS, ctx);
  }

  // 执行下一个中间建
  await next();
};

// 密码加密中间建
const hanlderPassword = async (ctx, next) => {
  const { password } = ctx.request.body;

  ctx.request.body.password = md5Password(password);
  await next();
};

module.exports = {
  verifyUser,
  hanlderPassword,
};
