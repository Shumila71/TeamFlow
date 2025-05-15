const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const checkRole = require("../middleware/roleMiddleware");
const chatController = require("../controllers/chatController");

router.post("/create", auth, chatController.createChat);
router.post("/add-user", auth, checkRole("admin"), chatController.addUserToChat);
router.post("/set-tag", auth, checkRole("admin"), chatController.setPositionTag);

module.exports = router;