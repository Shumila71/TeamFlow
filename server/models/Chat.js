const { pool } = require("../db");

const Chat = {
  async create(name, creatorId) {
    const result = await pool.query(
      "INSERT INTO chats (name, creator_id) VALUES ($1, $2) RETURNING *",
      [name, creatorId]
    );
    return result.rows[0];
  },

  async addUser(chatId, userId, role) {
    await pool.query(
      "INSERT INTO chat_users (chat_id, user_id, role) VALUES ($1, $2, $3)",
      [chatId, userId, role]
    );
  },

  async setPositionTag(chatId, userId, tag) {
    await pool.query(
      "UPDATE chat_users SET position_tag = $1 WHERE chat_id = $2 AND user_id = $3",
      [tag, chatId, userId]
    );
  },
};

module.exports = Chat;