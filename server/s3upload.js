require("dotenv").config();
const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");

// Environment variables from .env file
const BUCKET_NAME = process.env.BUCKET_NAME;
const REGION = process.env.REGION;
const ACCESS_KEY = process.env.ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;

// Set up AWS S3 client
const s3 = new AWS.S3({
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
  region: REGION,
});

// Multer configuration for file uploads to S3
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, { fieldname: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`); // Unique key for each file
    },
  }),
});

// Middleware for handling video uploads
const uploadToAWS = (req, res) => {
  upload.single("video")(req, res, (err) => {
    if (err) {
      console.error("Upload error:", err);
      return res.status(500).json({ error: "Error uploading video to S3" });
    }
    // Return the S3 file URL as the response
    res.json({
      message: "Video uploaded successfully",
      url: req.file.location, // S3 file URL
    });
  });
};

module.exports = { uploadToAWS };
