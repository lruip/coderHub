const PermissionService = require("../service/permission.service");
const { PERMISSION_DENIED } = require("../config/error");
// const permissionMoment = async (ctx, next) => {
//   const { momentId } = ctx.params;
//   const { id } = ctx.user;

//   // 查询是否有修改权限
//   const result = await PermissionService.checkMoment(momentId, id);
//   if (!result) {
//     ctx.app.emit("error", PERMISSION_DENIED, ctx);
//     return;
//   }

//   await next();
// };

// module.exports = { permissionMoment };

const verifyPermission = async (ctx, next) => {
  // 登录id
  const { id } = ctx.user;

  const keyName = Object.keys(ctx.params)[0];
  const resoureceId = ctx.params[keyName];
  const resoureceName = keyName.replace("Id", "");

  // 查询是否有修改权限
  const result = await PermissionService.checkResource(
    resoureceName,
    resoureceId,
    id
  );
  if (!result) {
    ctx.app.emit("error", PERMISSION_DENIED, ctx);
    return;
  }

  await next();
};

module.exports = { verifyPermission };
