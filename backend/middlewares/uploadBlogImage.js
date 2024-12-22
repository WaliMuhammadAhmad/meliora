const multer = require("multer");
const multerS3 = require("multer-s3");
const crypto = require("crypto");
const path = require("path");
const s3 = require("../config/s3");

// Configure multer-s3 for file uploads
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    key: function (req, file, cb) {
      // Generate a unique filename for the uploaded file
      const uniqueName =
        crypto.randomBytes(8).toString("hex") + path.extname(file.originalname);
      const filePath = `${process.env.S3_FOLDER_PATH}/blogs/${uniqueName}`;
      cb(null, filePath); // Folder for admins
    },
  }),
});

module.exports = upload;
