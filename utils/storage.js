const multer = require("multer");
const cloudinary = require("./cloudinary.js")
const { CloudinaryStorage } = require("multer-storage-cloudinary");


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "uploads",
        format: async (req, file) => "pdf",
        public_id: (req, file) => Date.now() + '-' + file.originalname
    },
});

module.exports = storage;