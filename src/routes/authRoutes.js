const express = require("express");
const router = express.Router();
const {
	registerUser,
	getUserById,
	updateUserProfile
} = require("../controllers/profileInfoController");

router.post("/register/user", registerUser);
router.put("/actualizarperfil", updateUserProfile);
router.get("/user/:user_id", getUserById);

module.exports = router;