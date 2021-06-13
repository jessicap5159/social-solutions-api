const { Thought, User } = require('../models');
const { db } = require('../models/Thought');

// /api/thoughts

const thoughtController = {
    // GET all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
          .then(dbThoughtData => res.json(dbThoughtData))
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
      },
    // GET single thought by id
    getThoughtById(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
          .then((dbUserData) => {
            // If no thought is found, send 404
            if (!dbUserData) {
              res.status(404).json({ message: 'No thought found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => {
            
            res.status(400).json(err);
          });
      },
   // POST to create a new thought and add to user's thoughts array field
   createThought({ body }, res) {
    Thought.create(body)
    .then(({ _id }) => {
        console.log("thought id: ", _id);
        return User.findOneAndUpdate(
            { _id: body.userId},
            { $push: { thoughts: _id } },
            { new: true }
        );
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
   
},

// PUT to update thought by id
updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, {$set: req.body}, { new: true, runValidators: true })
    .then((dbUserData) => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No thought found with this id! '});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
},

// DELETE thought by id

 removeThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
    .then((dbUserData) => {
        if (!dbUserData) {
             res.status(404).json({ message: 'No thought with this id!' });
            return;
        }
            // return User.findOneAndUpdate(
            //     { _id: req.params.userId },
            //     { $pull: { thoughts: req.params.thoughtId } },
            //     { new: true }
            // );
        // })
        // .then((dbUserData) => {
        //     if (!dbUserData) {
        //         res.status(404).json({ message: 'No user with this id!' });
        //         return;
        //     }
            res.json(dbUserData);
        })
   
        .catch(err => res.status(400).json(err));


},

// /api/thoughts/:thoughtId/reactions

// POST to create a reaction stored in a single thought's reactions array field
addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
        { _id:params.thoughtId },
        { $push: { reactions: body } },
        { new: true, runValidators: true }
    )
    .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought with this id!' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.json(err));
},

// DELETE to pull and remove a reaction by the reaction's reactionId value
removeReaction(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.reactionId })

        .then(dbUserData => {
            if (!dbUserData) {
                return res.status(404).json({ message: 'No thought with this id!' });
                
            }
            res.json(dbUserData);
        })
   
        .catch(err => res.status(400).json(err));


}

}
module.exports = thoughtController;