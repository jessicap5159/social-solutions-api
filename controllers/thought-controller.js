const { Thought } = require('../models');
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
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .select('-__v')
          .then(dbThoughtData => {
            // If no thought is found, send 404
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No thought found with this id!' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
      },
   // POST to create a new thought and add to user's thoughts array field
   createThought({ params, body }, res) {
    console.log(body);
    Thought.create(body)
    .then(({ _id }) => {
        return Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { thoughts: _id } },
            { new: true }
        );
    })
    .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!'});
            return;
        }
        res.json(dbThoughtData);
    })
    .catch(err => res.json(err));
},

// PUT to update thought by id
updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
    .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id! '});
            return;
        }
        res.json(dbThoughtData);
    })
    .catch(err => res.status(400).json(err));
},

// DELETE thought by id

 removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
    .then(deletedThought => {
        if (!deletedThought) {
            return res.status(404).json({ message: 'No thought with this id!' });
        }
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { thoughts: params.thoughtId } },
                { new: true }
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user with this id!' });
                return;
            }
            res.json(dbUserData);
        })
   
        .catch(err => res.json(err));


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
removeReaction({ params }, res) {
    Reaction.findOneAndDelete({ _id: params.reactionId })
    .then(deletedReaction => {
        if (!deletedReaction) {
            return res.status(404).json({ message: 'No reaction with this id!' });
        }
            return Thought.findOneAndUpdate(
                { _id: params.thoughtId },
                { $pull: { thoughts: params.thoughtId } },
                { new: true }
            );
        })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought with this id!' });
                return;
            }
            res.json(dbThoughtData);
        })
   
        .catch(err => res.json(err));


}

}
module.exports = thoughtController;