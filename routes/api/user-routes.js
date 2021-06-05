const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/user-controller');

// /api/users

// Set up GET all, GET single user, POST new user, PUT, and DELETE
router
.route('/users')
.get(getAllUsers)
.get(getUserById)
.post(createUser)
.put(updateUser)
.delete(deleteUser);

// /api/users/:userId/friends/:friendId



