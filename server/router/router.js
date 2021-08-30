const router = require("express").Router();
const { isAuthorized } = require("../middlewares/authorization");
const multer = require("multer");
const fs = require("fs");

const {
  storage,
  fetchPictures,
  updatePicture,
  deletePictureControl,
  fileFilter,
} = require("../initdb");
const { route } = require("../cookieApp");
const upload = multer({
  storage: storage,
  limits: 1024 * 1024 * 6,
  fileFilter: fileFilter,
});
// health check
router.get("/health", (req, res) => {
  return res.status(200).json({ status: "cookie-server-up" });
});

module.exports = router;
