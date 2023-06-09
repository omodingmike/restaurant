//storage for image upload
const multer = require("multer");
const storage = multer.diskStorage({
    destination: "./public/images",
    filename: (request, file, callback) => {
        callback(null, file.originalname);
    },
});

//file filter for extension
let fileFilter = (request, file, callback) => {
    const allowedMimes = [
        "image/jpeg",
        "image/jpg",
        "image/webp",
        "image/png",
        "image/gif",
    ];
    allowedMimes.includes(file.mimetype)
        ? callback(null, true)
        : callback(null, false);
};

const uploadImage = multer({
    storage: storage,
    limits: {fileSize: 10 ** 7}, //maximum file size is 10Mb
    fileFilter,
}).single("image");
module.exports = uploadImage;
