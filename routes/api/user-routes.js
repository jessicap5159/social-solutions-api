const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addNewFriend,
    deleteFriend
} = require('../../controllers/user-controller');

// /api/users

// Set up GET all and POST
router
.route('/')
.get(getAllUsers)
.post(createUser)

// GET by ID, PUT, DELETE

router
.route('/:userId')
.get(getUserById)
.put(updateUser)
.delete(deleteUser);

// /api/users/:userId/friends/:friendId

router
.route('/:userId/friends/:friendId')
.post(addNewFriend)
.delete(deleteFriend);

module.exports = router;