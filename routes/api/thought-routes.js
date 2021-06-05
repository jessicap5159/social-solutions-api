
// /api/thoughts

const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

// /api/thoughts

router
.route('/thoughts')
.find(getAllThoughts)
.findOne(getThoughtById)
.create(createThought)
.findOneAndUpdate(updateThought)
.findOneAndDelete(removeThought)

// /api/thoughts/:thoughtId/reactions

.route('/thoughts/:thoughtId/reactions')
.findOneAndUpdate(addReaction)
.findOneAndDelete(removeReaction);