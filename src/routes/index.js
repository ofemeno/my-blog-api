const express = require('express')
const router = express.Router()
const blog = require('./blog.routes')

router.use(blog)
module.exports = router