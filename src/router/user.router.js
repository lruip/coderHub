const KoaRouter = require("@koa/router");
const userController = require("../controller/user.controller");
const {
  verifyUser,
  hanlderPassword,
} = require("../middleware/user.middleware");

const userRouter = new KoaRouter({ prefix: "/users" });

userRouter.post("/", verifyUser, hanlderPassword, userController.create);

module.exports = userRouter;
