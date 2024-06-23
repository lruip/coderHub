const connection = require("../app/database");
class UserService {
  async create(user) {
    const { name, password } = user;

    // 拼接statement
    const statement = "INSERT INTO user(name, password) VALUES (?, ?);";

    // 执行SQL语句
    const [result] = await connection.execute(statement, [name, password]);
    return result;
  }

  // 查询用户
  async queryuser(name) {
    const statement = "SELECT * FROM user WHERE name = ?;";
    const [valuse] = await connection.execute(statement, [name]);
    return valuse;
  }

  async updateUserAvatar(avatarUrl, userId) {
    const statement = "UPDATE user SET avatar_url = ? WHERE id = ?;";
    const [resule] = await connection.execute(statement, [avatarUrl, userId]);
    return resule;
  }
}

module.exports = new UserService();
