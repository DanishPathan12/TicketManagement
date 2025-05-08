const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authmiddleware.js");
const { getUserDetails, userRoleChange, userStatusChange } = require("../controllers/admin.controller.js");



router.get('/admin/users', authMiddleware, getUserDetails);
router.patch('/admin/users/:id/role', authMiddleware, userRoleChange)
router.patch('/admin/users/:id/status', authMiddleware, userStatusChange);


module.exports = router;