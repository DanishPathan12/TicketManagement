const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = require("../utils/storage.js");
const { Register, Login, } = require("../controllers/user.controller.js")


const upload = multer({ storage });

router.post("/register", upload.single("photo"), Register);

router.post("/login", Login);



module.exports = router;

