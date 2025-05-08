const express = require("express");
const router = express.Router();
const { Register, Login, } = require("../controllers/user.controller.js")


const upload = multer({ storage });

router.post("/register", Register);

router.post("/login", Login);



module.exports = router;

