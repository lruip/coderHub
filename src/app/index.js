const koa = require("koa");
const bodyparser = require("koa-bodyparser");
const registerRouters = require("../router");

const app = new koa();

// 解析参数
app.use(bodyparser());

// 注册路由
registerRouters(app);

module.exports = app;
