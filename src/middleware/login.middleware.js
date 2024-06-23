const jwt = require("jsonwebtoken");
const {
  NAME_OR_PASSWORD_REQUIRED,
  USER_OR_PASSWORD_NOT_EXISTS,
  UNAUTHORIZED,
} = require("../config/error");
const { PUBLICKEY } = require("../config/screct");
const { queryuser } = require("../service/user.service");
const md5Password = require("../utils/md5-password");

const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body;

  if (!name || !password) {
    ctx.app.emit("error", NAME_OR_PASSWORD_REQUIRED, ctx);
    return;
  }

  // 根据用户名从数据库查询用户
  const users = await queryuser(name);
  const user = users[0];

  // 用户是否存在或密码是否正确
  if (!user || user.password !== md5Password(password)) {
    ctx.app.emit("error", USER_OR_PASSWORD_NOT_EXISTS, ctx);
    return;
  }

  ctx.user = user;
  await next();
};

const verifyAuth = async (ctx, next) => {
  const token = ctx.headers.authorization;
  try {
    // 解析token
    const result = jwt.verify(token, PUBLICKEY, {
      algorithm: ["RS256"],
    });

    // 保存token中的信息
    ctx.user = result;
    // 执行下一个中间件
    await next();
  } catch (error) {
    ctx.app.emit("error", UNAUTHORIZED, ctx);
  }
};

module.exports = {
  verifyLogin,
  verifyAuth,
};
