const connection = require("../app/database");

class FileService {
  async create(filename, mimetype, size, id) {
    const statement =
      "INSERT INTO avatar(filename, mimetype, size, user_id) VALUES (?,?,?,?);";
    const [result] = await connection.execute(statement, [
      filename,
      mimetype,
      size,
      id,
    ]);
    return result;
  }
  async queryAvatar(userId) {
    const statement = "SELECT * FROM avatar WHERE user_id = ?;";
    const [resule] = await connection.execute(statement, [userId]);
    return resule.pop();
  }
}

module.exports = new FileService();
