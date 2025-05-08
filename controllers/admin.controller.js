const User = require("../models/user.js");


const getUserDetails = async (req, res) => {
    try {
        const user = req.user.role;
        console.log(user);

        if (user != 'Admin') {
            return res.json({ msg: "not authorized " });
        }

        const users = await User.find({});
        if (!users) {
            return res.send("no user found");
        }
        res.json({ user: users });
    } catch (error) {
        return res.status(500).json({ msg: "no users", token });
    }

}


const userRoleChange = async (req, res) => {
    try {
        const userRole = req.user.role;

        if (userRole !== 'Admin') {
            return res.status(403).json({ msg: "Not authorized" });
        }

        const userId = req.params.id;
        const newrole = req.body.role;

        if (!['Admin', 'Agent', 'User', 'Owner'].includes(newrole)) {
            return res.status(400).json({ msg: "Invalid role" });
        }

        const updateRole = await User.findByIdAndUpdate(
            userId,
            { $set: { role: newrole } },
            { new: true, runValidators: true }
        );

        if (!updateRole) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.status(200).json({ message: "User role updated successfully", updatedRole: updateRole });
    } catch (error) {
        console.error("Error updating role:", error.message);
        res.status(500).json({ msg: "Server error" });
    }
};


const userStatusChange = async (req, res) => {
    try {
        const user = req.user.role;

        if (user != 'Admin') {
            return res.json({ msg: "not authorized" });
        }

        const userId = req.params.id;

        const updateStatus = await User.findByIdAndUpdate(
            userId,
            [{ $set: { status: { $not: "$status" } } }],
            { new: true }
        );



        if (!updateStatus) {
            res.status(500).json({ msg: "server error" });
        }
        res.json({ updatedRole: updateStatus });
    } catch (error) {
        res.status(500).json({ msg: "error in server" })
    }
}

module.exports = { getUserDetails, userRoleChange, userStatusChange };