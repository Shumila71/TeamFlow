const { pool } = require("../db");

const Message = {
  async send(chatId, senderId, text, replyTo = null) {
    const result = await pool.query(
      "INSERT INTO messages (chat_id, sender_id, text, reply_to) VALUES ($1, $2, $3, $4) RETURNING *",
      [chatId, senderId, text, replyTo]
    );
    return result.rows[0];
  },

  async getChatMessages(chatId) {
    const result = await pool.query(
      "SELECT * FROM messages WHERE chat_id = $1 ORDER BY created_at ASC",
      [chatId]
    );
    return result.rows;
  },
};

module.exports = Message;