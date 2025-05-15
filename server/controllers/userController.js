const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.getAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Ошибка получения пользователей" });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.getById(req.user.userId);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Ошибка получения данных пользователя" });
  }
};
