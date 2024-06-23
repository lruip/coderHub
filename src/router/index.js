const fs = require("fs");

function registerRouters(app) {
  const files = fs.readdirSync(__dirname);

  for (let file of files) {
    if (!file.endsWith(".router.js")) continue;
    const router = require(`./${file}`);
    app.use(router.routes());
    app.use(router.allowedMethods());
  }
}

module.exports = registerRouters;
