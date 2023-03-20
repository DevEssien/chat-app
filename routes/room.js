const express = require('express')

const roomController = require('../controllers/room')

const router = express.Router();

router.get('/', roomController.getRoom)

module.exports = router;