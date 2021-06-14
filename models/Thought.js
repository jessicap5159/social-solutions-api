// const { Schema, model } = require('mongoose');
// const ReactionSchema  = require('./Reaction');
// // const { kStringMaxLength } = require('node:buffer');
// const dateFormat = require('../utils/dateFormat');

// const ThoughtSchema = new Schema(
//     {
//         thoughtText: {
//             type: String,
//             required: 'You need to put a thought here!',
//             minLength: 1,
//             maxLength: 280
//         },
//         username: {
//             type: String,
//             required: 'You must put something here!',
//         },
       
//         createdAt: {
//             type: Date,
//             default: Date.now,
//             get: createdAtValue => dateFormat(createdAtValue)

//         },
//         reactions: [ReactionSchema]

//     },
//     {
//         toJSON: {
//             getters: true
//         },
//         id: false
//     }

// );

// ThoughtSchema.virtual('reactionCount').get(function() {
//     return this.reactions.length;

// });


// const Thought = model('Thought', ThoughtSchema);

// module.exports = Thought;


const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: 'You need to leave a thought!',
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtValue => dateFormat(createdAtValue)
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});
const Thought = model('Thought', thoughtSchema);
module.exports = Thought;