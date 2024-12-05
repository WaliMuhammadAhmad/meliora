const multer = require("multer");
const multerS3 = require("multer-s3");
const crypto = require("crypto");
const s3 = require("../config/s3"); // Ensure you have an S3 config file exporting the S3 instance.

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.S3_BUCKET_NAME,
    acl: "public-read",
    key: function (req, file, cb) {
      const uniqueName =
        crypto.randomBytes(8).toString("hex") + path.extname(file.originalname);
      cb(null, `${process.env.S3_FOLDER_PATH}/blogs/${uniqueName}`); // Folder for blogs
    },
  }),
});

module.exports = upload;
