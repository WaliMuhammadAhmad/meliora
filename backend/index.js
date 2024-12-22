require("dotenv").config();
const { S3Client } = require("@aws-sdk/client-s3");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const connection = require("./config/db");
const router = require("./routers/router");
const s3 = require("./config/s3");
const app = express();
const port = process.env.SERVER_PORT;
const appOrigin = process.env.REACT_APP_API_ORIGIN;

app.use(cors({ origin: appOrigin }));
app.use(express.json());
app.use(morgan("dev"));
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use("/", router);

// Serve images from S3
app.get("/images/:key", async (req, res) => {
  const { key } = req.params;

  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
  };

  try {
    const data = await s3.send(new GetObjectCommand(params));
    res.writeHead(200, { "Content-Type": data.ContentType });
    res.write(data.Body);
    res.end();
  } catch (err) {
    console.error("Error fetching image from S3:", err);
    res.status(404).send("Image not found");
  }
});

if (process.env.NODE_ENV !== "production") {
  connection().then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  });
}

module.exports = app;
