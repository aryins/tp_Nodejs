const express = require('express');
const router = express.Router();
const { sendMessage, getMessages } = require('../controllers/messageController');
const { protect } = require('../middlewares/auth');

router.use(protect);
router.post('/', sendMessage);
router.get('/:chatId', getMessages);

module.exports = router;