const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Register = async (req, res) => {
    try {
        const { username, firstname, lastname, email, age, phone, address, password, role } = req.body;



        if (!username || !email || !password) {
            return res.status(400).json({ msg: "Either email, password, or name is missing" });
        }


        const salt = await bcrypt.genSalt(10);
        const hashedPw = await bcrypt.hash(password, salt);

        const newStudent = new User({
            username,
            firstname,
            lastname,
            age,
            email,
            phone,
            address,
            password: hashedPw,
            role,
        });

        await newStudent.save();
        return res.status(201).json({ msg: "user is created" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Server error" });
    }
}

const Login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ msg: "Email or password is incorrect" });
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(400).json({ msg: "Wrong password" });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                user: user.username
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        const isProduction = process.env.NODE_ENV === "production";

        res.cookie("authToken", token, {
            httpOnly: true,
            secure: isProduction,
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(200).json({ msg: "User is logged in", token });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Server error" });
    }
}


module.exports = { Register, Login }
