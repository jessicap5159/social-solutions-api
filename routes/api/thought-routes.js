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
.get(getAllThoughts)
.get(getThoughtById)
.post(createThought)
.put(updateThought)
.delete(removeThought)

// /api/thoughts/:thoughtId/reactions
router
.route('/thoughts/:thoughtId/reactions')
.post(addReaction)
.delete(removeReaction);

module.exports = router;