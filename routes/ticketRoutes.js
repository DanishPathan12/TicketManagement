const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authmiddleware.js");
const { createTicket, getTicketforAdmin, getMyTicket, getTicketbyID, updateTicketbyOwnerAndAgent, deleteTicket } = require("../controllers/ticket.controller.js")

router.post('/tickets', authMiddleware, createTicket);
router.get('/tickets', authMiddleware, getTicketforAdmin);
router.get('/tickets/my', authMiddleware, getMyTicket);

router.get('/tickets/:id', authMiddleware, getTicketbyID);
router.patch('/tickets/:id', authMiddleware, updateTicketbyOwnerAndAgent);
router.delete('/tickets/:id', authMiddleware, deleteTicket);

module.exports = router;