const Chat = require("../models/Chat");
const Message = require("../models/Message");
const User = require("../models/User");

exports.createChat = async (req, res) => {
  const { name } = req.body;
  const userId = req.user.userId;
  try {
    const chat = await Chat.create(name, userId);
    await Chat.addUser(chat.id, userId, "admin");
    res.status(201).json(chat);
  } catch (err) {
    res.status(500).json({ error: "Ошибка создания чата" });
  }
};

exports.addUserToChat = async (req, res) => {
  const { chatId, userId, role } = req.body;
  try {
    await Chat.addUser(chatId, userId, role || "member");
    res.status(201).json({ message: "Пользователь добавлен" });
  } catch (err) {
    res.status(500).json({ error: "Ошибка добавления пользователя" });
  }
};

exports.setPositionTag = async (req, res) => {
  const { chatId, userId, position_tag } = req.body;
  try {
    await Chat.setPositionTag(chatId, userId, position_tag);
    res.json({ message: "Тег-должность обновлён" });
  } catch (err) {
    res.status(500).json({ error: "Ошибка обновления тега" });
  }
};