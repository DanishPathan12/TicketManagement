const Ticket = require("../models/ticket.js");

const createTicket = async (req, res) => {
    try {
        // Extract data from the request body
        const { title, description, priority, status } = req.body;

        const assignedTo = req.user.username;
        // Basic validation
        if (!title || !description || !priority) {
            return res.status(400).json({ message: 'All required fields must be filled.' });
        }

        // Create a new ticket object
        const newTicket = new Ticket({
            title,
            description,
            priority,
            assignedTo, // Optional
            status, // Default status
            createdAt: new Date()
        });

        // Save to database
        await newTicket.save();

        // Send success response
        res.status(201).json({ message: 'Ticket created successfully', ticket: newTicket });

    } catch (error) {
        console.error('Error creating ticket:', error.message);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

const getTicketforAdmin = async (req, res) => {
    try {
        const user = req.user.role;

        if (user !== 'Admin' && user !== 'Agent') {
            return res.json({ msg: "Unauthorized to access, must be signed in as Admin or Agent" });
        }

        const allticket = await Ticket.find({});
        res.json({ tickets: allticket });
    } catch (error) {
        res.status(505).json({ msg: "server error " })
    }
}

const getMyTicket = async (req, res) => {

    try {
        const user = req.user.role;

        if (user != 'User') {
            return res.send("not authorized");
        }
        const myID = req.user.username;
        console.log(myID);

        const myticket = await Ticket.findOne({ assignedTo: myID })

        res.json({ myticket: myticket });
    } catch (error) {
        res.status(505).json({ msg: "server error " })

    }
}


const getTicketbyID = async (req, res) => {
    try {
        const id = req.params.id;
        const userRole = req.user.role;

        if (userRole !== ('User') && userRole !== ('Agent')) {
            return res.status(403).json({ message: "Not authorized" });
        }
        const ticket = await Ticket.findById(id);

        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }

        res.status(200).json({ ticket });
    } catch (error) {
        console.error('Error fetching ticket by ID:', error.message);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

const updateTicketbyOwnerAndAgent = async (req, res) => {
    try {
        const id = req.params.id;
        const userRole = req.user.role;
        if (userRole !== ('Owner') && userRole !== 'Agent') {
            return res.status(403).json({ message: "Not authorized" });
        }
        const { title, description, status } = req.body
        const updatedTicket = await Ticket.findByIdAndUpdate(
            id,
            { $set: { title, description, status } },
            { new: true, runValidators: true }
        );
        if (!updatedTicket) {
            return res.status(404).json({ message: "Ticket not found" });
        }
        res.status(200).json({ message: "Ticket updated successfully", ticket: updatedTicket });
    }
    catch (error) {
        res.status(500).json({ message: "Server error. Please try again later." });
    }
}


const deleteTicket = async (req, res) => {
    try {
        const id = req.params.id;
        const userRole = req.user.role;
        if (userRole !== ('Owner') && userRole !== ('Agent')) {
            return res.status(403).json({ message: "Not authorized" });
        }
        const deleteTicket = await Ticket.findByIdAndDelete(id);
        if (!deleteTicket) {
            res.json({ msg: "error in deletion process" });
        }

        res.json({ delete: "ticket is deleted" })
    }
    catch (error) {
        res.status(500).json({ message: "Server error. Please try again later." });
    }
}


module.exports = { createTicket, getTicketforAdmin, getMyTicket, getTicketbyID, updateTicketbyOwnerAndAgent, deleteTicket };

