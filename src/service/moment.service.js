const connection = require("../app/database");

class MomentService {
  async create(content, id) {
    const statement = "INSERT INTO moment(content,user_id) VALUES (?, ?);";

    const [result] = await connection.execute(statement, [content, id]);

    return result;
  }
  async queryList(size, offset) {
    const statement = `
      SELECT 
        m.id id, m.content content, m.createAt createAt, m.updateAt updateAt,
        JSON_OBJECT('id', u.id, 'name', u.name,'avatarUrl', u.avatar_url, 'createAt', u.createAt, 'updateAt', u.updateAt) user,
        (SELECT COUNT(*) FROM comment WHERE m.id = comment.moment_id) commentCount,
        (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id ) countLabel
      FROM moment m 
      LEFT JOIN user u ON m.user_id = u.id LIMIT ? OFFSET ?;`;

    const [result] = await connection.execute(statement, [
      String(size),
      String(offset),
    ]);
    return result;
  }

  async queryById(momentId) {
    const statement = `
      SELECT 
        m.id id, m.content content, m.createAt createAt, m.updateAt updateAt,
        JSON_OBJECT("id", u.id,  "name", u.name,'avatarUrl', u.avatar_url, "createAt", u.createAt, "updateAt", u.updateAt) user,
        (
          SELECT	
            JSON_ARRAYAGG(JSON_OBJECT(
              "id", c.id, "content", c.content, "commentId", c.comment_id,
              "user", JSON_OBJECT("id", cu.id, "name", cu.name)
            ))
          FROM comment c 
          LEFT JOIN user cu ON c.user_id = cu.id
          WHERE c.moment_id = m.id
        ) comments,
        (
          JSON_ARRAYAGG(
            JSON_OBJECT("id", lb.id, "name", lb.name)
          )
        ) labes
        FROM  moment m 
        LEFT JOIN user u ON m.user_id = u.id 
        LEFT JOIN moment_label ml ON ml.moment_id = m.id
        LEFT JOIN label lb ON lb.id = ml.label_id
        WHERE m.id = ?
        GROUP BY m.id;
    `;

    const [result] = await connection.execute(statement, [momentId]);
    return result;
  }

  async remove(momentId) {
    const statement = `DELETE FROM moment WHERE id = ?;`;
    const [result] = await connection.execute(statement, [momentId]);
    return result;
  }

  async update(content, momentId) {
    const statement = `UPDATE moment SET content= ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [content, momentId]);
    return result;
  }

  // 查询label是否存在
  async hasLabel(momentId, labelId) {
    const statement =
      "SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;";
    const [result] = await connection.execute(statement, [momentId, labelId]);
    return !!result.length;
  }
  async addLabel(momentId, labelId) {
    const statement =
      "INSERT INTO moment_label(moment_id,label_id) VALUES (?, ?);";
    const [result] = await connection.execute(statement, [momentId, labelId]);
    return result;
  }
}

module.exports = new MomentService();
