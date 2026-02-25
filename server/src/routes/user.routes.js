const express = require('express');
const {
    getUsers,
    getUser,
    updateUser,
    setUserStatus
} = require('../controllers/users/user.controller');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth.middleware');

router.use(protect);
router.use(authorize('ADMIN'));

router.get('/', getUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.put('/:id/activate', setUserStatus);
router.put('/:id/deactivate', setUserStatus);

module.exports = router;
