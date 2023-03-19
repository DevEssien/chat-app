const express = require('express')

const userController = require('../controllers/auth-user')

const router = express.Router();

router.get('/', userController.getHome)

module.exports = router;