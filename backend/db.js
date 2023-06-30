// 数据库
const { JsonDB, Config } = require("node-json-db");

var db = new JsonDB(new Config("database", true, true, "/"));

module.exports = {
  // 获取榜单
  getUserRank: () => {
    return db.getData('/userRank')
  },
  // 获取用户的分数
  getScoreByUser: async (userId) => {
    return (await db.getData('/user-scores')).find(i => String(i.userId) === String(userId))
  },
  register: (username, password) => {
    return db.push('/users[]', {username, password}, true)
  },
  getUser: async (username) => {
    return (await db.getData('/users')).find(i => String(i.username) === String(username))
  }
} 