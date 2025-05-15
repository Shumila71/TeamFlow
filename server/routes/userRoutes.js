const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");

router.get("/", auth, userController.getAllUsers);
router.get("/me", auth, userController.getCurrentUser);

module.exports = router;
