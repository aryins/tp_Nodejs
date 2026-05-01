const express = require('express');
const router = express.Router();
const { createChat, getChats, getChatById } = require('../controllers/chatController');
const { protect } = require('../middlewares/auth');

router.use(protect); // Todas las rutas requieren autenticación
router.post('/', createChat);
router.get('/', getChats);
router.get('/:id', getChatById);

module.exports = router;