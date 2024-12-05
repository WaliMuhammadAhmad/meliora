require("dotenv").config();
const AWS = require("aws-sdk");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const path = require("path");
const connection = require("./db");
const router = require("./routers/router");

const app = express();
const port = process.env.SERVER_PORT;
const appOrigin = process.env.REACT_APP_API_ORIGIN;

// AWS S3 Configuration
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

app.use(cors({ origin: appOrigin }));
app.use(express.json());
app.use(morgan("dev"));
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// Serve routes
app.use("/", router);

// Serve images from S3
app.get("/images/:key", async (req, res) => {
  const { key } = req.params;

  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
  };

  try {
    const data = await s3.getObject(params).promise();
    res.writeHead(200, { "Content-Type": data.ContentType });
    res.write(data.Body);
    res.end();
  } catch (err) {
    console.error("Error fetching image from S3:", err);
    res.status(404).send("Image not found");
  }
});

connection().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});

module.exports = app;
