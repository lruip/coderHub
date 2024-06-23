const connection = require("../app/database");

class CommentService {
  async create(id, momentId, content) {
    const statement = `INSERT INTO comment(user_id, moment_id, content) VALUES (?, ?, ?);`;
    const [result] = await connection.execute(statement, [
      id,
      momentId,
      content,
    ]);
    return result;
  }

  async reply(id, momentId, commentId, content) {
    const statement = `INSERT INTO comment(user_id, moment_id,comment_id, content) VALUES (?, ?, ?, ?);`;
    const [result] = await connection.execute(statement, [
      id,
      momentId,
      commentId,
      content,
    ]);
    return result;
  }
}

module.exports = new CommentService();
