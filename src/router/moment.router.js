const KoaRouter = require("@koa/router");
const momentRouter = new KoaRouter({ prefix: "/moment" });
const { verifyAuth } = require("../middleware/login.middleware");
// const { permissionMoment } = require("../middleware/permission.middleware");
const { verifyPermission } = require("../middleware/permission.middleware");
const {
  create,
  list,
  detail,
  update,
  remove,
  addLabels,
} = require("../controller/moment.controller");
const { verifyMoment } = require("../middleware/moment.middleware");
const { verifyLabelExists } = require("../middleware/label.middleware");

// 增: 新增动态
momentRouter.post("/", verifyAuth, verifyMoment, create);
// 查： 查询动态列表
momentRouter.post("/list", list);
momentRouter.get("/detail/:momentId", detail);
// 删： 删除动态
momentRouter.delete("/delete/:momentId", verifyAuth, verifyPermission, remove);
// 改： 修改动态
momentRouter.patch("/update/:momentId", verifyAuth, verifyPermission, update);

// 添加标签
momentRouter.post(
  "/:momentId/labels",
  verifyAuth,
  verifyPermission,
  verifyLabelExists,
  addLabels
);

module.exports = momentRouter;
