const mysql = require("mysql2");

const connectionPool = mysql.createPool({
  host: "localhost",
  port: 3306,
  database: "coderHub",
  user: "root",
  password: "lirpMySQL.",
  connectionLimit: 5,
});

// 获取链接是否成功
connectionPool.getConnection((err, connection) => {
  if (err) {
    console.log("连接失败");
    return;
  }

  // 尝试和数据库建立连接
  connection.connect((err) => {
    if (err) {
      console.log("和数据库交互失败！");
    } else {
      console.log("数据库连接成功");
    }
  });
});

const connection = connectionPool.promise();

module.exports = connection;
