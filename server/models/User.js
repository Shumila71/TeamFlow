const { pool } = require("../db");

const User = {
  async getAll() {
    const result = await pool.query("SELECT id, username FROM users");
    return result.rows;
  },

  async getById(id) {
    const result = await pool.query("SELECT id, username FROM users WHERE id = $1", [id]);
    return result.rows[0];
  },
};

module.exports = User;
