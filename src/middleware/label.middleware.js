const { queryLabelName, create } = require("../service/label.service");
const verifyLabelExists = async (ctx, next) => {
  const { labels } = ctx.request.body;

  const newLabels = [];
  for (let name of labels) {
    let labelObj = { name };
    const resulte = await queryLabelName(name);
    if (resulte) {
      labelObj.id = resulte.id;
    } else {
      const insertResulte = await create(name);
      labelObj.id = insertResulte.insertId;
    }
    newLabels.push(labelObj);
  }

  ctx.labels = newLabels;
  await next();
};

module.exports = {
  verifyLabelExists,
};
