// const multer = require("multer");
// const path = require("path");

// module.exports = multer({

//   storage: multer.diskStorage({}),
//   fileFilter: (req, file, cb) => {
//     let ext = path.extname(file.originalname);
//     if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
//       cb(new Error("File type is not supported"), false);
//       return;
//     }
//     cb(null, true);
//   },
// });


// tring to directly save images in my cloudinary inside a new created folder called "dreamville" 

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary"); // Import Cloudinary
const path = require("path");

// Set up Cloudinary storage with a folder name
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "dreamville", // Change this to your Cloudinary folder name
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

// Multer configuration with Cloudinary storage
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname).toLowerCase();
    if (![".jpg", ".jpeg", ".png"].includes(ext)) {
      return cb(new Error("File type is not supported"), false);
    }
    cb(null, true);
  },
});

module.exports = upload;
