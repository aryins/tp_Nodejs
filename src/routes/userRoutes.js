const express = require('express');
const router = express.Router();
const { createUser, getUsers, deleteUser, loginUser } = require('../controllers/userController');
const { protect } = require('../middlewares/auth');

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/', protect, getUsers);
router.delete('/:id', protect, deleteUser);

module.exports = router;