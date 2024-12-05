const multer = require("multer");
const multerS3 = require("multer-s3");
const crypto = require("crypto");
const s3 = require("../config/s3");

const uploadMultiple = multer({
  storage: multerS3({
    s3,
    bucket: process.env.S3_BUCKET_NAME,
    acl: "public-read",
    key: function (req, file, cb) {
      let folderPath;
      if (file.fieldname === "frontImage" || file.fieldname === "backImage") {
        folderPath = `${process.env.S3_FOLDER_PATH}/products`;
      } else if (file.fieldname.startsWith("steps")) {
        folderPath = `${process.env.S3_FOLDER_PATH}/products/usage`;
      }

      const uniqueName =
        crypto.randomBytes(8).toString("hex") + path.extname(file.originalname);
      cb(null, `${folderPath}/${uniqueName}`);
    },
  }),
}).fields([
  { name: "frontImage", maxCount: 1 },
  { name: "backImage", maxCount: 1 },
  { name: "steps[step1][image]", maxCount: 1 },
  { name: "steps[step2][image]", maxCount: 1 },
  { name: "steps[step3][image]", maxCount: 1 },
]);

const multerErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.error("Multer error:", err);
    return res.status(400).json({ error: err.message });
  }
  if (err) {
    console.error("Internal server error:", err);
    return res
      .status(500)
      .json({ error: "Internal server error", message: err.message });
  }
  next();
};

module.exports = { uploadMultiple, multerErrorHandler };
