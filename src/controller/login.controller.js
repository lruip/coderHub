const jwt = require("jsonwebtoken");
const { PRIVATEKEY, PUBLICKEY } = require("../config/screct");
class LoginController {
  sign(ctx, next) {
    const { id, name } = ctx.user;

    // 非对称加密颁发tokne
    const token = jwt.sign({ id, name }, PRIVATEKEY, {
      expiresIn: 24 * 60 * 60,
      algorithm: "RS256",
    });

    ctx.body = {
      code: 200,
      message: "登录成功！",
      data: { id, name, token },
    };
  }

  test(ctx, next) {
    ctx.body = {
      code: 200,
      message: "请求成功",
    };
  }
}

module.exports = new LoginController();
