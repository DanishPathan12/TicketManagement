const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: { type: String, required: false },
    lastname: { type: String, required: false },
    username: { type: String, required: true, unique: true },
    age: { type: Number, required: false },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: false },
    address: { type: String, required: false },
    photo: { type: String },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['Admin', 'Agent', 'User', "Owner"],
        default: 'User',
    },

    status: { type: Boolean, default: true }

});

module.exports = mongoose.model('user', userSchema);