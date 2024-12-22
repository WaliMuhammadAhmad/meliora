const multer = require("multer");
const multerS3 = require("multer-s3");
const crypto = require("crypto");
const path = require("path");
const { S3Client } = require("@aws-sdk/client-s3");

// Initialize the S3 client
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Configure multer-s3 for file uploads
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    key: function (req, file, cb) {
      // Generate a unique filename for the uploaded file
      const uniqueName =
        crypto.randomBytes(8).toString("hex") + path.extname(file.originalname);
      const filePath = `${process.env.S3_FOLDER_PATH}/admin/${uniqueName}`;
      cb(null, filePath); // Folder for admins
    },
  }),
});

module.exports = upload;
