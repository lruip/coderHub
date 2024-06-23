const KoaRouter = require("@koa/router");
const { verifyAuth } = require("../middleware/login.middleware");
const { publish, reply } = require("../controller/comment.controller");
const commentRouter = new KoaRouter({ prefix: "/comment" });

// 发表评论
commentRouter.post("/publish", verifyAuth, publish);
// 回复评论
commentRouter.post("/reply", verifyAuth, reply);

module.exports = commentRouter;
