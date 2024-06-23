const KoaRouter = require("@koa/router");
const { verifyAuth } = require("../middleware/login.middleware");
const { handleAvatar } = require("../middleware/file.middleware");
const { create, showAvatar } = require("../controller/file.controller");

const fileRouter = new KoaRouter({ prefix: "/upload" });
fileRouter.post("/avatar", verifyAuth, handleAvatar, create);
fileRouter.get("/avatar/:userId", showAvatar);

module.exports = fileRouter;
