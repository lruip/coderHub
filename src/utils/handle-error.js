const app = require("../app/index");
const {
  NAME_OR_PASSWORD_REQUIRED,
  NAME_IS_ALREADY_EXISTS,
  USER_OR_PASSWORD_NOT_EXISTS,
  UNAUTHORIZED,
  CONTENT_NOT_EXISTS,
  PERMISSION_DENIED,
} = require("../config/error");

app.on("error", (error, ctx) => {
  let code = 0;
  let message = "";

  switch (error) {
    case NAME_OR_PASSWORD_REQUIRED:
      code = -1001;
      message = "用户名或密码不能为空！";
      break;
    case NAME_IS_ALREADY_EXISTS:
      code = -1002;
      message = "用户已经存在！";
      break;
    case USER_OR_PASSWORD_NOT_EXISTS:
      code = -1003;
      message = "用户名或密码错误！";
      break;
    case UNAUTHORIZED:
      code = -1004;
      message = "token无效或以过期！";
      break;
    case CONTENT_NOT_EXISTS:
      code = -1003;
      message = "内容不能为空！";
      break;
    case PERMISSION_DENIED:
      code = -2001;
      message = "暂无权限访问";
      break;
  }
  ctx.body = { code, message };
});
