const { User } = require('../models');
const { db } = require('../models/User');


// /api/users


const userController = {
    // get all users
    getAllUsers(req, res) {
      User.find({})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    },
   // get one user by id
  getUserById(req, res) {
    User.findOne({ _id: req.params.userId })
    .populate([
        {
            path: "friends",
            select: "-__v",
        },
        {
            path: "thoughts",
            select: "-__v",
        }
    ])
    .select('-__v')
      .then(dbUserData => {
        // If no user is found, send 404
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },


// POST a new user
    // createUser
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },

// PUT to update user by id
// update user by id
updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, {$set: req.body}, { new: true, runValidators: true })
    .then((dbUserData) => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
},

// delete user
deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
    .then((dbUserData) => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
},
// /api/users/:userId/friends/:friendId
addNewFriend(req, res) {
   
    User.findOneAndUpdate(
        {_id: req.params.userId},
       { $addToSet: { friends: req.params.friendId } },
       { new: true}

    )

    .then((dbUserData) => {
        if (!dbUserData) {
            return res.status(404).json({ message: "No user found with this id" });
            
        }

       
        res.json(dbUserData);
    })
  
    .catch(err => res.status(400).json(err));
},
deleteFriend(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } },  { new: true })
    .then((dbUserData) => {
        if (!dbUserData) {
            return res.status(404).json({ message: 'No user with this id!' });
        }
     res.json(dbUserData);
    })
 
    .catch(err => res.status(400).json(err));
}

};

module.exports = userController;