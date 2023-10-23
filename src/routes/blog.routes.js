const express = require("express");
const router = express.Router();
const blogController = require('../controllers/blog.controller')

router.post("/register", blogController.register);

module.exports = router;
