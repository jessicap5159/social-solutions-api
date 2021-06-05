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
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
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
updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id! '});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
},

// delete user
deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
},
// /api/users/:userId/friends/:friendId
addNewFriend({}) {
    User.findOneAndUpdate({
        new: true
       // { $addToSet: { <field1>: <value1>, ... } }


    })
}

}

module.exports = userController;