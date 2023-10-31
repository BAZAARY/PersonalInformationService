const express = require("express");
const router = express.Router();
const {
	registerUser,
} = require("../controllers/profileInfoController");
const { updateUserProfile } = require("../controllers/profileInfoController");

router.post("/register/user", registerUser);

router.put("/actualizarperfil", updateUserProfile);

module.exports = router;